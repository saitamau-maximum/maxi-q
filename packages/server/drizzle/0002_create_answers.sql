CREATE TABLE answers (
    `answer_id` TEXT PRIMARY KEY,
    `question_id` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `author_id` TEXT NOT NULL,
    `answered_at` INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`question_id`) REFERENCES questions(`id`),
    FOREIGN KEY(`author_id`) REFERENCES users(`id`)
);