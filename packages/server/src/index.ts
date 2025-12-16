import { vValidator } from "@hono/valibot-validator";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { sign } from "hono/jwt";
import * as v from "valibot";
import {
	answers as answersTable,
	questions as questionsTable,
	users as usersTable,
} from "./db/schema";
import { authMiddleware } from "./middleware/auth";

const EXPIRED_DURATION = 60 * 60 * 48;

type JwtPayload = {
	sub: string;
};

export type HonoEnv = {
	Bindings: Env;
	Variables: {
		jwtPayload: JwtPayload;
	};
};

export const app = new Hono<HonoEnv>();

const registerSchema = v.object({
	displayId: v.string(),
	name: v.string(),
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(8)),
});
const loginUserSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(8)),
});

const createQuestionSchema = v.object({
	title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
	content: v.pipe(v.string(), v.minLength(1), v.maxLength(5000)),
});

const createAnswerSchema = v.object({
	content: v.pipe(v.string(), v.minLength(1), v.maxLength(5000)),
});

const setBestAnswerSchema = v.object({
	answerId: v.nullable(v.pipe(v.string(), v.uuid())),
});

app.use("*", cors());

app.get("/", (c) => c.text("Hono!"));

app.get("/users", async (c) => {
	const db = drizzle(c.env.DB);
	const users = await db
		.select({
			id: usersTable.id,
			displayId: usersTable.displayId,
			name: usersTable.name,
			createdAt: usersTable.createdAt,
		})
		.from(usersTable)
		.all();
	return c.json(users);
});

app.get("/users/:id", async (c) => {
	const { id } = c.req.param();
	const db = drizzle(c.env.DB);

	try {
		const user = await db
			.select({
				id: usersTable.id,
				displayId: usersTable.displayId,
				name: usersTable.name,
				createdAt: usersTable.createdAt,
			})
			.from(usersTable)
			.where(eq(usersTable.id, id))
			.get();
		return c.json(user);
	} catch (e) {
		console.error(e);
		return c.json({ error: "User not found" }, 404);
	}
});

app.post("/api/register", vValidator("json", registerSchema), async (c) => {
	const { displayId, name, email, password } = c.req.valid("json");
	const db = drizzle(c.env.DB);

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await db
			.insert(usersTable)
			.values({
				id: crypto.randomUUID(),
				displayId,
				name,
				email,
				passwordHash: hashedPassword,
				createdAt: new Date(),
			})
			.returning();
		return c.json(result);
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to create user" }, 500);
	}
});

app.post("/login", vValidator("json", loginUserSchema), async (c) => {
	const { email, password } = c.req.valid("json");
	const db = drizzle(c.env.DB);

	try {
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.get();

		if (!user) {
			return c.json({ error: "Invalid email or password" }, 401);
		}

		const isValid = await bcrypt.compare(password, user.passwordHash);

		if (!isValid) {
			return c.json({ error: "Invalid email or password" }, 401);
		}

		const payload = {
			sub: user.id,
			exp: Math.floor(Date.now() / 1000) + EXPIRED_DURATION,
		};

		if (!c.env.JWT_SECRET) {
			console.error("JWT_SECRET is not set");
			return c.json({ error: "Internal Server Error" }, 500);
		}

		const token = await sign(payload, c.env.JWT_SECRET);

		return c.json({
			token,
		});
	} catch (e) {
		console.error(e);
		return c.json({ error: "Login failed" }, 500);
	}
});

app.get("/auth/me", authMiddleware, async (c) => {
	const db = drizzle(c.env.DB);

	const userId = c.get("jwtPayload").sub;

	const user = await db
		.select({
			id: usersTable.id,
			displayId: usersTable.displayId,
			name: usersTable.name,
			createdAt: usersTable.createdAt,
		})
		.from(usersTable)
		.where(eq(usersTable.id, userId))
		.get();

	if (!user) {
		return c.json({ error: "User not found" }, 404);
	}

	return c.json(user);
});

app.use("/questions/*", authMiddleware);

app.post("/questions", vValidator("json", createQuestionSchema), async (c) => {
	const { title, content } = c.req.valid("json");
	const db = drizzle(c.env.DB);

	try {
		const result = await db
			.insert(questionsTable)
			.values({
				id: crypto.randomUUID(),
				title,
				content,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		return c.json(result, 201);
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to create question" }, 500);
	}
});

app.get("/questions/:id", async (c) => {
	const { id } = c.req.param();
	const db = drizzle(c.env.DB);

	try {
		const question = await db
			.select()
			.from(questionsTable)
			.where(eq(questionsTable.id, id))
			.get();

		if (!question) {
			return c.json({ error: "Question not found" }, 404);
		}

		return c.json(question, 200);
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to fetch question" }, 500);
	}
});

app.get("/questions/:id/answers", async (c) => {
	const { id: questionId } = c.req.param();
	const db = drizzle(c.env.DB);

	try {
		// 回答一覧取得
		const answers = await db
			.select()
			.from(answersTable)
			.where(eq(answersTable.questionId, questionId))
			.all();

		return c.json(answers, 200);
	} catch (e) {
		console.error(e);
		return c.json({ error: "Failed to fetch answers" }, 500);
	}
});

app.post(
	"/questions/:id/answers",
	vValidator("json", createAnswerSchema),
	async (c) => {
		const { id: questionId } = c.req.param();
		const { content } = c.req.valid("json");

		const db = drizzle(c.env.DB);

		const question = await db
			.select()
			.from(questionsTable)
			.where(eq(questionsTable.id, questionId))
			.get();

		if (!question) {
			return c.json({ error: "Question not found" }, 404);
		}

		try {
			const result = await db
				.insert(answersTable)
				.values({
					id: crypto.randomUUID(),
					questionId: questionId,
					content,
					answeredAt: new Date(),
					updatedAt: new Date(),
				})
				.returning();

			return c.json(result, 201);
		} catch (e) {
			console.error(e);
			return c.json({ error: "Failed to post answer" }, 500);
		}
	},
);

export const ErrorCode = {
  QUESTION_NOT_FOUND: "QUESTION_NOT_FOUND",
  ANSWER_NOT_FOUND: "ANSWER_NOT_FOUND",
  ANSWER_NOT_BELONG_TO_QUESTION: "ANSWER_NOT_BELONG_TO_QUESTION",
} as const;

app.put(
  "/questions/:id/solve",
  vValidator("json", setBestAnswerSchema),
  async (c) => {
    const { id: questionId } = c.req.param();
    const { answerId } = c.req.valid("json");

    const db = drizzle(c.env.DB);

    try {
      await db.transaction(async (tx) => {
        // 質問取得
        const question = await tx
          .select()
          .from(questionsTable)
          .where(eq(questionsTable.id, questionId))
          .get();

        if (!question) {
          throw new Error(ErrorCode.QUESTION_NOT_FOUND);
        }

        // 解除の場合
        if (answerId === null) {
          await tx
            .update(questionsTable)
            .set({
              bestAnswerId: null,
              solved: 0,
              updatedAt: new Date(),
            })
            .where(eq(questionsTable.id, questionId));

          return;
        }

        // answer 存在確認
        const answer = await tx
          .select()
          .from(answersTable)
          .where(eq(answersTable.id, answerId))
          .get();

        if (!answer) {
          throw new Error(ErrorCode.ANSWER_NOT_FOUND);
        }

        if (answer.questionId !== questionId) {
          throw new Error(ErrorCode.ANSWER_NOT_BELONG_TO_QUESTION);
        }

        // ベストアンサー更新
        await tx
          .update(questionsTable)
          .set({
            bestAnswerId: answerId,
            solved: 1,
            updatedAt: new Date(),
          })
          .where(eq(questionsTable.id, questionId));
      });

      return c.json({ success: true }, 200);

    } catch (e) {
      console.error(e);

      if (!(e instanceof Error)) {
        return c.json({ error: "Failed to update best answer" }, 500);
      }

      switch (e.message) {
        case ErrorCode.QUESTION_NOT_FOUND:
          return c.json({ error: "Question not found" }, 404);

        case ErrorCode.ANSWER_NOT_FOUND:
          return c.json({ error: "Answer not found" }, 404);

        case ErrorCode.ANSWER_NOT_BELONG_TO_QUESTION:
          return c.json(
            { error: "Answer does not belong to the question" },
            400,
          );
          
        default:
          return c.json({ error: "Failed to update best answer" }, 500);
      }
    }
  },
);

export default { fetch: app.fetch };
