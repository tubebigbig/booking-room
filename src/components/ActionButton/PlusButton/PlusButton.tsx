import Button, { ButtonProps } from "@/components/Button";

export type PlusButtonProps = Readonly<{
  disabled?: boolean;
}> &
  ButtonProps;

const PlusButton = ({ disabled, ...props }: PlusButtonProps) => {
  return (
    <Button className="my-ui-inline-block" disabled={disabled} {...props}>
      +
    </Button>
  );
};

export default PlusButton;
