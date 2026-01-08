import { Link } from "react-router";
import { css, cx } from "styled-system/css";

const baseStyles = css({
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "10px 20px",
	fontSize: "14px",
	fontWeight: "bold",
	borderRadius: "6px",
	cursor: "pointer",
	transition: "all 0.2s",
	textDecoration: "none",
	border: "none",
	_disabled: {
		opacity: 0.6,
		cursor: "not-allowed",
	},
});

const variants = {
	primary: css({
		backgroundColor: "#1a1a1a",
		color: "#fff",
		_hover: {
			backgroundColor: "#333",
		},
	}),
	secondary: css({
		backgroundColor: "#fff",
		color: "#1a1a1a",
		border: "1px solid #d4d4d4",
		_hover: {
			backgroundColor: "#f5f5f5",
			borderColor: "#a3a3a3",
		},
	}),
	ghost: css({
		backgroundColor: "transparent",
		color: "#4a4a4a",
		_hover: {
			backgroundColor: "#f5f5f5",
		},
	}),
};

const sizes = {
	sm: css({
		padding: "6px 12px",
		fontSize: "13px",
	}),
	md: css({
		padding: "10px 20px",
		fontSize: "14px",
	}),
	lg: css({
		padding: "12px 32px",
		fontSize: "16px",
	}),
};

type ButtonProps = {
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
	disabled?: boolean;
	className?: string;
} & (
	| ({ as?: "button" } & React.ButtonHTMLAttributes<HTMLButtonElement>)
	| ({ as: "link"; to: string } & Omit<
			React.AnchorHTMLAttributes<HTMLAnchorElement>,
			"href"
	  >)
);

export function Button({
	variant = "primary",
	size = "md",
	className,
	...props
}: ButtonProps) {
	const combinedClassName = cx(
		baseStyles,
		variants[variant],
		sizes[size],
		className,
	);

	if (props.as === "link") {
		const { as: _, to, ...linkProps } = props;
		return <Link to={to} className={combinedClassName} {...linkProps} />;
	}

	const { as: _, ...buttonProps } = props;
	return <button type="button" className={combinedClassName} {...buttonProps} />;
}
