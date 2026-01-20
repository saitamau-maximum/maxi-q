import { useEffect, useState } from "react";
import { css } from "styled-system/css";
import ErrorMessage from "~/components/error-message";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Loading } from "~/components/ui/loading";
import { useProfile } from "~/hooks/use-profile";

export default function ProfilePage() {
	const { user, isLoading, isSubmitting, error, updateProfile } = useProfile();
	const [nameContent, setNameContent] = useState("");

	useEffect(() => {
		if (user) setNameContent(user.name);
	}, [user]);

	if (isLoading) return <Loading message="プロフィールを読み込み中..." />;

	if (error) return <ErrorMessage message={error.message} />;

	const handleUpdate = async () => {
		await updateProfile(nameContent);
	};

	return (
		<div
			className={css({
				maxWidth: "600px",
				margin: "0 auto",
				padding: "24px",
			})}
		>
			{user && (
				<div
					className={css({
						padding: "24px",
						borderRadius: "8px",
						border: "1px solid #e5e5e5",
						marginBottom: "32px",
						backgroundColor: "#fff",
					})}
				>
					<h1
						className={css({
							fontSize: "24px",
							fontWeight: "bold",
							marginBottom: "20px",
							color: "#1a1a1a",
						})}
					>
						マイプロフィール
					</h1>

					<div className={css({ marginBottom: "12px" })}>
						<p
							className={css({
								fontSize: "14px",
								color: "#6b6b6b",
								marginBottom: "4px",
							})}
						>
							ID
						</p>
						<p
							className={css({
								fontSize: "16px",
								color: "#1a1a1a",
							})}
						>
							{user.id}
						</p>
					</div>

					<div>
						<p
							className={css({
								fontSize: "14px",
								color: "#6b6b6b",
								marginBottom: "4px",
							})}
						>
							ユーザーID
						</p>
						<p
							className={css({
								fontSize: "16px",
								color: "#1a1a1a",
							})}
						>
							{user.displayId}
						</p>
					</div>
				</div>
			)}

			<div
				className={css({
					padding: "24px",
					border: "1px solid #e5e5e5",
					borderRadius: "8px",
					backgroundColor: "#fff",
				})}
			>
				<h2
					className={css({
						fontSize: "18px",
						fontWeight: "bold",
						marginBottom: "20px",
						color: "#1a1a1a",
					})}
				>
					プロフィール編集
				</h2>

				<div className={css({ marginBottom: "16px" })}>
					<Input
						label="表示名"
						type="text"
						value={nameContent}
						onChange={(e) => setNameContent(e.target.value)}
						placeholder="表示名を入力"
						disabled={isSubmitting}
					/>
				</div>

				<Button
					onClick={handleUpdate}
					disabled={isSubmitting || !nameContent.trim()}
				>
					{isSubmitting ? "更新中..." : "更新する"}
				</Button>
			</div>
		</div>
	);
}
