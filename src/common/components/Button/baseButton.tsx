import React from "react";

type IBtnSizes = "L" | "M" | "S"; // L by default

export interface IBtnThemeProps {
  color: string;
  backgroundColor: string;
  borderColor?: string; // currentColor by default
}

export interface IBtnProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    React.PropsWithChildren {
  size?: IBtnSizes;
  fullWidth?: boolean;
  square?: boolean;
  rounded?: boolean;
  customStyles?: React.CSSProperties; 
}

const BtnSizes: Record<IBtnSizes, string> = {
  L: "h-12",
  M: "h-10",
  S: "h-8",
};

const BtnFontSizes: Record<IBtnSizes, string> = {
  L: "text-base",
  M: "text-sm",
  S: "text-xs",
};

export default function BaseButton(props: IBtnProps & IBtnThemeProps) {
  const {
    size = "L",
    backgroundColor,
    color,
    borderColor,
    children,
    fullWidth,
    onClick,
    square,
    rounded,
    disabled,
    customStyles, // Nueva prop
    ...inputProps
  } = props;

  // Fusionar estilos base con customStyles
  const buttonStyles = {
    color: color,
    backgroundColor: backgroundColor,
    borderColor: borderColor || "currentColor",
    height: BtnSizes[size],
    ...customStyles, // Aplicar estilos personalizados
  };

  return (
    <button
      className={`
        flex items-center justify-center
        ${BtnSizes[size]}
        ${BtnFontSizes[size]}
        ${fullWidth ? "w-full" : "w-fit"}
        ${square ? "min-w-[var(--btn-height)] px-0" : "px-6"}
        ${rounded ? "rounded-[20vw]" : "rounded-lg"}
        ${disabled ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
        gap-2
        border
        outline-none
      `}
      style={buttonStyles} // Aplicar estilos fusionados
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...inputProps}
    >
      {children}
    </button>
  );
}