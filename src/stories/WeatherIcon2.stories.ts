import type { Meta, StoryObj } from "@storybook/react-vite";

// import { fn } from "storybook/test";

import { WeatherIcon2 as WeatherIcon } from "./WeatherIcon2";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/WeatherIcon2",
  component: WeatherIcon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof WeatherIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Filled: Story = {
  args: { filled: true },
};

export const FilledWithDivider: Story = {
  args: { filled: true, divider: true },
};

export const Unfilled: Story = {
  args: {},
};

export const UnfilledWithDivider: Story = {
  args: { divider: true, className: "w-12 h-12" },
};

export const Featured: Story = {
  args: { filled: true, featured: true },
};

export const CustomClassName: Story = {
  args: { className: "bg-gradient-to-br from-black from-50% to-white to-50%" },
};
