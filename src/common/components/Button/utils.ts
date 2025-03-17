import { theme } from "../../config/theme";
import { IBtnThemeProps } from "./baseButton";

export const BtnSizes = {
	L: "50px",
	M: "38px",
	S: "32px",
} as const;

export const BtnFontSizes = {
	L: "16px",
	M: "14px",
	S: "12px",
} as const;

export type IBtnVariant = "primary" | "secondary" | "ghost" | "secondary-gray";


export const BtnVariants: Record<IBtnVariant, IBtnThemeProps> = {
	primary: {
		color: theme.color.NEUTRAL[0],
		backgroundColor: "#5B35FF",
		borderColor: "#5B35FF",
	},
	secondary: {
		color: "#5B35FF",
		backgroundColor: "white",
		borderColor: "currentColor",
	},
	ghost: {
		color: "#5B35FF",
		backgroundColor: "transparent",
		borderColor: "transparent",
	},
	["secondary-gray"]: {
		color: theme.color.NEUTRAL[900],
		backgroundColor: "white",
		borderColor: theme.color.NEUTRAL[400],
	},
};

export type PropsWithStyledPrefix<T extends Record<string, any>> = {
	[K in keyof T as `$${K & string}`]: T[K];
};

export interface StyledBtnProps extends PropsWithStyledPrefix<IBtnThemeProps> {
	$fullWidth?: boolean;
	$square?: boolean;
	$rounded?: boolean;
	$h: string;
	$fontSize: string;
}