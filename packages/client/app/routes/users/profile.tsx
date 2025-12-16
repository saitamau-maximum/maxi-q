import { useEffect, useState } from "react";
import { css } from "styled-system/css";
import ErrorMessage from "~/components/error-message";

type User = {
	id: string;
	displayId: string;
	name: string;
	createdAt: string;
};

export default function ProfilePage() {
	// 1. データ取得の状態管理 (useQuestion の代わり)
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// 2. フォーム送信の状態管理 (useAnswers の代わり)
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [nameContent, setNameContent] = useState("");

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setIsLoading(true);

				const token = localStorage.getItem("token");

				const res = await fetch("http://localhost:8787/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!res.ok) {
					throw new Error("Failed to fetch profile");
				}

				const data: User = await res.json();
				setUser(data);
				setNameContent(data.name);
			} catch (e) {
				setError(e instanceof Error ? e : new Error("Unknown error"));
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfile();
	}, []);

	const handleUpdate = async () => {
		if (!nameContent.trim()) return;

		try {
			setIsSubmitting(true);

			const token = localStorage.getItem("token");

			const res = await fetch("http://localhost:8787/auth/me", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ name: nameContent }),
			});

			if (!res.ok) {
				throw new Error("Failed to update profile");
			}

			const updatedUser: User = await res.json();
			setUser(updatedUser);
			alert("Profile updated successfully!");
		} catch (e) {
			console.error("Failed to update", e);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading)
		return <div className={css({ padding: "16px" })}>Loading profile...</div>;

	if (error) return <ErrorMessage message={error.message} />;

	return (
		<div
			className={css({
				maxWidth: "800px",
				margin: "0 auto",
				padding: "16px",
			})}
		>
			{/* プロフィール情報表示 */}
			{user && (
				<div
					className={css({
						padding: "24px",
						borderRadius: "8px",
						border: "1px solid #e2e8f0",
						marginBottom: "32px",
						backgroundColor: "#fff",
					})}
				>
					<h1
						className={css({
							fontSize: "24px",
							fontWeight: "bold",
							marginBottom: "16px",
						})}
					>
						My Profile
					</h1>

					<div className={css({ marginBottom: "12px" })}>
						{}
						<p
							className={css({
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "8px",
							})}
						>
							<strong>ID:</strong> {user.id}
						</p>

						<p className={css({ fontSize: "16px", lineHeight: "1.6" })}>
							<strong>Display ID:</strong> {user.displayId}
						</p>
					</div>
				</div>
			)}

			{/* 編集フォーム*/}
			<h2
				className={css({
					fontSize: "20px",
					fontWeight: "bold",
					marginBottom: "16px",
					borderBottom: "1px solid #e2e8f0",
					paddingBottom: "8px",
				})}
			>
				Edit Profile
			</h2>

			<div
				className={css({
					padding: "24px",
					border: "1px solid #e2e8f0",
					borderRadius: "8px",
					backgroundColor: "#fff",
				})}
			>
				<h3
					className={css({
						fontSize: "18px",
						fontWeight: "bold",
						marginBottom: "12px",
					})}
				>
					Display Name
				</h3>

				<input
					type="text"
					value={nameContent}
					onChange={(e) => setNameContent(e.target.value)}
					placeholder="Enter your name"
					disabled={isSubmitting}
					className={css({
						width: "100%",
						padding: "12px",
						border: "1px solid #cbd5e1",
						borderRadius: "6px",
						marginBottom: "12px",
						outline: "none",
						fontSize: "16px",
						_focus: {
							borderColor: "#3b82f6",
							boxShadow: "0 0 0 1px #3b82f6",
						},
					})}
				/>

				<button
					type="button"
					onClick={handleUpdate}
					disabled={isSubmitting || !nameContent.trim()}
					className={css({
						padding: "10px 20px",
						backgroundColor: isSubmitting ? "#94a3b8" : "#2563eb",
						color: "white",
						fontWeight: "bold",
						borderRadius: "6px",
						cursor: isSubmitting ? "not-allowed" : "pointer",
						transition: "background-color 0.2s",
						border: "none",
						_hover: {
							backgroundColor: isSubmitting ? "#94a3b8" : "#1d4ed8",
						},
					})}
				>
					{isSubmitting ? "Updating..." : "Update Profile"}
				</button>
			</div>
		</div>
	);
}
