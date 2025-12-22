import { useCallback, useEffect, useState } from "react";
import type { User } from "~/types/user";
import { serverFetch } from "~/utils/fetch";

export const useProfile = () => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchProfile = useCallback(async () => {
		try {
			setIsLoading((prev) => (prev ? prev : true));
			const res = await serverFetch("/auth/me");
			if (!res.ok) throw new Error("Failed to fetch profile");

			const data = await res.json();
			setUser(data);
			return data;
		} catch (e) {
			setError(e instanceof Error ? e : new Error("Unknown error"));
		} finally {
			setIsLoading(false);
		}
	}, []);

	const updateProfile = useCallback(async (name: string) => {
		if (!name.trim()) return null;

		try {
			setIsSubmitting(true);
			setError(null);

			const res = await serverFetch("/auth/me", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name }),
			});

			if (!res.ok) throw new Error("Failed to update profile");

			const updatedUser: User = await res.json();
			setUser(updatedUser);
			return updatedUser;
		} catch (e) {
			setError(e instanceof Error ? e : new Error("Unknown error"));
			return null;
		} finally {
			setIsSubmitting(false);
		}
	}, []);

	useEffect(() => {
		fetchProfile();
	}, [fetchProfile]);

	return {
		user,
		setUser,
		isLoading,
		isSubmitting,
		error,
		refetch: fetchProfile,
		updateProfile,
	};
};
