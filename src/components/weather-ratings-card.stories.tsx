import type { Meta, StoryObj } from "@storybook/react-vite";

import { WeatherRatingsCard } from "./weather-ratings-card";

const meta = {
  title: "Example/WeatherRatingsCard",
  component: WeatherRatingsCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof WeatherRatingsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
