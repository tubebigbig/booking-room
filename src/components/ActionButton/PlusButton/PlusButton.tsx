import Button, { ButtonProps } from "@/components/Button";
import clsx from "clsx";

export type PlusButtonProps = Readonly<{
  disabled?: boolean;
}> &
  Omit<ButtonProps, "children">;

const PlusButton = ({ disabled, className, ...props }: PlusButtonProps) => {
  return (
    <Button
      className={clsx("my-ui-inline-block", className)}
      disabled={disabled}
      {...props}
    >
      +
    </Button>
  );
};

export default PlusButton;
