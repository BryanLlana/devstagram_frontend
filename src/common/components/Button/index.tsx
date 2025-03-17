import BaseButton, { IBtnProps, IBtnThemeProps } from "./baseButton";
import { BtnVariants } from "./utils";

interface IProps extends IBtnProps, Partial<IBtnThemeProps> {
  variant?: keyof typeof BtnVariants; // primary by default
  
}

// TODO: add square variant

export default function Button(props: IProps) {
  const { variant, color, borderColor, backgroundColor, ...btnProps } = props;
  const currentVariantTheme = BtnVariants[variant || "primary"];
  return (
    <BaseButton
      borderColor={borderColor || currentVariantTheme.borderColor}
      color={color || currentVariantTheme.color}
      backgroundColor={backgroundColor || currentVariantTheme.backgroundColor}
      {...btnProps}
    >
      {props.children}
    </BaseButton>
  );
}