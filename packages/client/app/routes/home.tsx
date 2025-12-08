import { useCallback, useEffect, useState } from "react";
import { css } from "styled-system/css";
import type { CreateUserParams, User } from "~/types/user";
import { serverFetch } from "~/utils/fetch";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

export default function Home() {
	const [users, setUsers] = useState<User[]>([]);
	const fetchUsers = useCallback(async () => {
		try {
			const response = await serverFetch("/users");
			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}
			const users = await response.json();
			setUsers(users);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const userParams: CreateUserParams = {
			displayId: formData.get("displayId") as string,
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		try {
			const response = await serverFetch("/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userParams),
			});
			if (!response.ok) {
				throw new Error("Failed to create user");
			}
			const newUser = await response.json();
			console.log("User created:", newUser);
			await fetchUsers();
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<div>
			<p
				className={css({
					fontSize: "20px",
					fontWeight: "bold",
					color: "blue.500",
				})}
			>
				Welcome to the Home Page!
			</p>

			<h2>User List</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.displayId} - {user.name} - {user.email}
					</li>
				))}
			</ul>
		</div>
	);
}
