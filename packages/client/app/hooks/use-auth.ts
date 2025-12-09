import { useEffect, useState } from "react";
import type { AuthUser } from "~/types/user";
import { serverFetch } from "~/utils/fetch";

export function useAuth() {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const controller = new AbortController();

		async function fetchMe() {
			try {
				const res = await serverFetch("/auth/me", {
					signal: controller.signal,
				});

				if (!res.ok) {
					throw new Error("Unauthorized");
				}

				const data: AuthUser = await res.json();
				setUser(data);
			} catch (e) {
				if (controller.signal.aborted) return; // 中断された場合は何もしない
				console.error(e);
				setError(e instanceof Error ? e : new Error("Unknown error"));
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMe();

		return () => controller.abort();
	}, []);

	return { user, isLoading, error };
}
