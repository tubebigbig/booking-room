import type { Meta, StoryObj } from "@storybook/react";
import BookingPage, { BookingPageProps } from "./BookingPage";

const meta: Meta<typeof BookingPage> = {
  title: "Pages/BookingPage",
  component: BookingPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BookingPage>;

export const Default: Story = {
  args: {
    people: {
      adult: 1,
      child: 1,
    },
    rooms: [
      {
        roomPrice: 100,
        adultPrice: 50,
        childPrice: 25,
        capacity: 2,
      },
    ],
  },
};
