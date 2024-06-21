import Button, { ButtonProps } from "@/components/Button";

export type MinusButtonProps = Readonly<{
  disabled?: boolean;
}> &
  ButtonProps;

const MinusButton = ({ disabled, ...props }: MinusButtonProps) => {
  return (
    <Button className="my-ui-inline-block" disabled={disabled} {...props}>
      -
    </Button>
  );
};

export default MinusButton;
