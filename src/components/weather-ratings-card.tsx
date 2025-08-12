import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  WeatherIconCool,
  WeatherIconHot,
  WeatherIconMild,
  WeatherIconVeryHot,
  WeatherIconWarm,
} from "@/stories/WeatherIcon";

export function WeatherRatingsCard() {
  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">
          San Francisco Weather
        </CardTitle>
        <CardDescription>
          Weather conditions for each half of the month
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <div className="grid grid-cols-12 gap-2 md:gap-3 lg:gap-4">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Jan
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconCool
                // icon="mdi:snowflake"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-400"
              />
              <WeatherIconCool
                // icon="mdi:weather-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Feb
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconMild
                // icon="mdi:weather-snowy-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-300"
              />
              <WeatherIconMild
                // icon="mdi:weather-partly-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Mar
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconMild
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-600"
              />
              <WeatherIconMild
                // icon="mdi:weather-partly-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Apr
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconMild
                // icon="mdi:weather-partly-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-400"
              />
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              May
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-500"
              />
              <WeatherIconWarm
                // icon="mdi:weather-partly-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-400"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Jun
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-400"
              />
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Jul
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-red-400"
              />
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-red-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Aug
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconWarm
                // icon="mdi:weather-sunny"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-red-500"
              />
              <WeatherIconWarm
                // icon="mdi:weather-partly-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-orange-400"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Sep
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconWarm
                // icon="mdi:weather-partly-cloudy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-500"
              />
              <WeatherIconHot
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Oct
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconHot
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
              <WeatherIconVeryHot
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Nov
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconHot
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
              <WeatherIconHot
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              Dec
            </span>
            <div className="flex flex-col space-y-1">
              <WeatherIconWarm
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
              <WeatherIconMild
                // icon="mdi:weather-rainy"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-blue-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
