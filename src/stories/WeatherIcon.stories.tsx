import type { Meta, StoryObj } from "@storybook/react-vite";

// import { fn } from "storybook/test";
import { Cloud, Sun } from "lucide-react";
import {
  WeatherIcon,
  WeatherIconBrisk,
  WeatherIconCold,
  WeatherIconCool,
  WeatherIconHot,
  WeatherIconMild,
  WeatherIconVeryHot,
  WeatherIconWarm,
  weatherIconMap2,
} from "./WeatherIcon";

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

export const MultipleInRow: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon filled />
        <WeatherIcon filled dot />
        <WeatherIcon filled>
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon filled divider />
        <WeatherIcon filled divider dot />
        <WeatherIcon filled divider>
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon
          featured
          className="-rotate-45 bg-gradient-to-br from-blue-500 from-50% to-white to-50%"
        />
        <WeatherIcon
          featured
          dot
          className="-rotate-45 bg-gradient-to-br from-blue-500 from-50% to-white to-50%"
        />
        <WeatherIcon
          dot
          featured
          className="-rotate-45 bg-gradient-to-br from-blue-500 from-50% to-white to-50%"
        />
        <WeatherIcon
          featured
          className="-rotate-45 bg-gradient-to-br from-blue-500 from-50% to-white to-50%"
        >
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>

      {/* <WeatherIcon filled featured>
        <Square className="w-2 h-2 fill-white" />
      </WeatherIcon> */}
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon filled featured className="bg-blue-500">
          {/* <CloudSun className="w-3 h-3 fill-white" /> */}
        </WeatherIcon>{" "}
        <WeatherIcon filled featured dot className="bg-blue-500">
          {/* <CloudSun className="w-3 h-3 fill-white" /> */}
        </WeatherIcon>{" "}
        <WeatherIcon filled featured dot>
          {/* <CloudSun className="w-3 h-3 fill-white" /> */}
        </WeatherIcon>
        <WeatherIcon filled featured>
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>
      {/* <WeatherIcon filled featured>
        <Cloud className="w-3 h-3 fill-white stroke-0" />
      </WeatherIcon> */}
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon featured>
          {/* <Cloud className="w-3 h-3 " /> */}
        </WeatherIcon>
        <WeatherIcon featured dot>
          {/* <Cloud className="w-3 h-3 " /> */}
        </WeatherIcon>
        <WeatherIcon featured>
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon divider />
        <WeatherIcon divider dot />
        <WeatherIcon divider>
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIcon />
        <WeatherIcon dot />
        <WeatherIcon>
          <Sun className="w-4 h-4 fill-yellow-400" />
        </WeatherIcon>
      </div>
    </div>
  ),
};

export const WeatherIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex gap-2 flex-col items-center">
        <WeatherIconCold />
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIconBrisk />
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIconCool />
      </div>

      <div className="flex gap-2 flex-col items-center">
        <WeatherIconMild />
      </div>

      <div className="flex gap-2 flex-col items-center">
        <WeatherIconWarm />
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIconHot />
      </div>
      <div className="flex gap-2 flex-col items-center">
        <WeatherIconVeryHot />
      </div>
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
