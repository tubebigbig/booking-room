import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import PlusButton from "./PlusButton";

const meta = {
  title: "Components/ActionButton/PlusButton",
  component: PlusButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof PlusButton>;

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
