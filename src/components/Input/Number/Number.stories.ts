import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Number from "./Number";

const meta: Meta = {
  title: "Components/Input/Number",
  component: Number,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
    },
  },
  args: { value: 0 },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onchange: fn(),
  },
};
