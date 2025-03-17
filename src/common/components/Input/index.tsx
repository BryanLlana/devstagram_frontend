import React, { forwardRef } from "react";
import { theme } from "../../config/theme";

export interface IBaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  smallSize?: boolean;
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Input = forwardRef<HTMLInputElement, IBaseInputProps>((props, ref) => {
  const {
    startElement,
    endElement,
    style,
    containerProps,
    smallSize,
    onChange,
    type,
    ...inputProps
  } = props;

  return (
    <div
      className={`
        flex items-center
        ${smallSize ? "h-10" : "h-12"}
        ${startElement ? "pl-3" : "pl-4"}
        ${endElement ? "pr-3" : "pr-4"}
        ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
        bg-white border border-gray-300 rounded-lg
        focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500
      `}
      style={style}
      {...containerProps}
    >
      {startElement}
      <input
        type={type === "number" ? "text" : type || "text"}
        ref={ref}
        className={`
          w-full h-full
          bg-transparent
          placeholder:text-[${theme.color.NEUTRAL[500]}]
          focus:outline-none
          ${props.disabled ? "cursor-not-allowed" : ""}
        `}
        style={{ color: theme.color.NEUTRAL[900] }}
        {...inputProps}
        onChange={(e) => {
          if (type === "number" && isNaN(Number(e.target.value))) return;
          onChange?.(e);
        }}
      />
      {endElement}
    </div>
  );
});

export default Input;
