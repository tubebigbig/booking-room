import React, { MouseEventHandler } from "react";
import clsx from "clsx";

export type ButtonProps = Readonly<{
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "success" | "error" | "warning" | "info";
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onMouseUp?: MouseEventHandler<HTMLButtonElement>;
}>;

const Color = {
  success: "teal",
  error: "red",
  warning: "yellow",
  info: "blue",
};

function makeColorClass(color: ButtonProps["color"] = "success") {
  return `border border-${Color[color]}-400 text-${Color[color]}-400 focus:border-${Color[color]}-500 hover:border-${Color[color]}-500 focus:text-${Color[color]}-500 hover:text-${Color[color]}-500`;
}

const Button = ({
  color = "success",
  children,
  disabled,
  className,
  onClick,
  onMouseDown,
  onMouseUp,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "p-2 rounded-md",
        disabled && "opacity-50 cursor-not-allowed",
        color === "success" && makeColorClass("success"),
        color === "error" && makeColorClass("error"),
        color === "warning" && makeColorClass("warning"),
        color === "info" && makeColorClass("info"),
        className
      )}
      onClick={(e) => !disabled && onClick?.(e)}
      onMouseDown={(e) => !disabled && onMouseDown?.(e)}
      onMouseUp={(e) => onMouseUp?.(e)}
    >
      {children}
    </button>
  );
};

export default Button;
