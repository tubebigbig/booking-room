import Button, { ButtonProps } from "@/components/Button";
import clsx from "clsx";

export type MinusButtonProps = Readonly<{
  disabled?: boolean;
}> &
  Omit<ButtonProps, "children">;

const MinusButton = ({ disabled, className, ...props }: MinusButtonProps) => {
  return (
    <Button
      className={clsx("my-ui-inline-block", className)}
      disabled={disabled}
      {...props}
    >
      -
    </Button>
  );
};

export default MinusButton;
