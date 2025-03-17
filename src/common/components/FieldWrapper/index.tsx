import { FC } from "react";
import { theme } from "../../config/theme";
import { OptionalBadge } from "../OptionalBadge";

interface IProps extends React.PropsWithChildren {
  labelContent?: React.ReactNode;
  inlineError?: React.ReactNode;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  optional?: boolean;
}

export const FieldWrapper: FC<IProps> = (props) => {
  return (
    <div className="flex flex-col gap-1 min-w-0" style={props.style}>
      {props.labelContent && (
        <label
          className={`flex items-center justify-between`}
          style={{
            ...props.labelStyle,
            color: theme.color.NEUTRAL[700],
          }}
        >
          <span>{props.labelContent}</span>
          {props.optional && <OptionalBadge />}
        </label>
      )}
      {props.children}
      {props.inlineError && (
        <span style={{ color: theme.color.ALERT[700] }}>
          {props.inlineError}
        </span>
      )}
    </div>
  );
};
