import type { Meta, StoryObj } from "@storybook/react-vite";

// import { fn } from "storybook/test";
import { Cloud } from "lucide-react";
import { WeatherIcon, weatherIconMap2 } from "./WeatherIcon";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/WeatherIcon",
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
  args: { divider: true },
};

export const Featured: Story = {
  args: { filled: true, featured: true },
};

export const CustomClassName: Story = {
  args: { className: "bg-gradient-to-br from-black from-50% to-white to-50%" },
};

export const FeaturedCustomClassName: Story = {
  args: {
    className: "bg-gradient-to-br from-black from-50% to-white to-50%",
    featured: true,
  },
};

export const WithChildren: Story = {
  args: { children: <span className="text-[10px]">☆</span> },
};

export const FeaturedWithChildren: Story = {
  args: { children: "☆", featured: true, className: "" },
};

export const WithChildIcon: Story = {
  args: { children: <Cloud className="w-4 h-4 fill-white" /> },
};

export const WeatherIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      {Object.values(weatherIconMap2).map(({ component: Component }) => (
        <Component />
      ))}
    </div>
  ),
};

export const WeatherIconsSunny: Story = {
  render: () => (
    <div className="flex gap-4">
      {Object.values(weatherIconMap2).map(({ component: Component }) => (
        <Component dot />
      ))}
    </div>
  ),
};
