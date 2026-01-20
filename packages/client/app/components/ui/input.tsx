import { css, cx } from "styled-system/css";

const inputStyles = css({
	width: "100%",
	padding: "10px 12px",
	fontSize: "14px",
	borderRadius: "6px",
	border: "1px solid #d4d4d4",
	backgroundColor: "#fff",
	color: "#1a1a1a",
	outline: "none",
	transition: "all 0.2s",
	_focus: {
		borderColor: "#1a1a1a",
		boxShadow: "0 0 0 1px #1a1a1a",
	},
	_disabled: {
		backgroundColor: "#f5f5f5",
		cursor: "not-allowed",
	},
	_placeholder: {
		color: "#a3a3a3",
	},
});

const labelStyles = css({
	display: "block",
	fontSize: "14px",
	fontWeight: "medium",
	color: "#4a4a4a",
	marginBottom: "6px",
});

type InputProps = {
	label?: string;
	className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, className, id, ...props }: InputProps) {
	const inputId = id || props.name;

	return (
		<div>
			{label && (
				<label htmlFor={inputId} className={labelStyles}>
					{label}
				</label>
			)}
			<input id={inputId} className={cx(inputStyles, className)} {...props} />
		</div>
	);
}
