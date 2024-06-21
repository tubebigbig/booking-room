import React, { MouseEventHandler } from "react";
import clsx from "clsx";

export type ButtonProps = Readonly<{
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "success" | "error" | "warning" | "info";
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const Button = ({
  color = "success",
  children,
  disabled,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "my-ui-button",
        disabled && "opacity-50 cursor-not-allowed",
        color === "success" && "border border-teal-400 text-teal-400",
        color === "error" && "border border-red-400 text-red-400",
        color === "warning" && "border border-yellow-400 text-yellow-400",
        color === "info" && "border border-blue-400 text-blue-400",
        className
      )}
      onClick={(e) => !disabled && onClick?.(e)}
    >
      {children}
    </button>
  );
};

export default Button;
