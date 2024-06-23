import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export type NumberProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const Number = ({ className, ...props }: NumberProps) => {
  return (
    <input
      className={clsx(
        "my-ui-inline-block p-2 rounded-md text-base border border-teal-400 text-teal-400 focus:border-teal-500 focus:text-teal-500 hover:border-teal-500 hover:text-teal-500",
        className
      )}
      type="number"
      {...props}
    />
  );
};

export default Number;
