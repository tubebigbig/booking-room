import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import MinusButton from "./MinusButton";

const meta = {
  title: "Components/ActionButton/MinusButton",
  component: MinusButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof MinusButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
