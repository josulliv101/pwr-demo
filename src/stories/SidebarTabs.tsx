import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { HeartIcon } from "lucide-react";
import { YearlyWeatherIcons, type Tuple } from "./WeatherRatings";
import cities from "../data/cities.json";
const cityDataMap: Record<
  string,
  { name: string; weatherRatings?: Array<number> }
> = cities.reduce((acc, city) => {
  acc[city.id] = city;
  return acc;
}, {} as Record<string, { name: string; weatherRatings?: Array<number> }>);

const sdSunnyDaysByPeriod: Tuple<number, 24> = [
  // Jan
  7, 7,
  // Feb
  7, 8,
  // Mar
  8, 8,
  // Apr
  8, 9,
  // May (May Gray)
  7, 6,
  // Jun (June Gloom)
  6, 7,
  // Jul
  9, 10,
  // Aug
  10, 11,
  // Sep
  10, 9,
  // Oct
  9, 8,
  // Nov
  8, 7,
  // Dec
  7, 7,
];

export function SidebarTabs({
  showSunnyDays,
  activeCityIds,
}: {
  showSunnyDays?: boolean;
  activeCityIds?: string[];
}) {
  return (
    <div className="flex w-full max-w-sm__ flex-col gap-6 mt-0 overflow-y-auto">
      <Tabs defaultValue="password">
        <TabsList className="bg-none shadow-none border-0 rounded-lg px-0">
          <TabsTrigger value="password" className="bg-none shadow-none">
            Compare Cities
            {/* <HeartIcon className="stroke-0 fill-gray-600" /> My Cities */}
          </TabsTrigger>{" "}
          <TabsTrigger value="account">Worldwide City Rankings</TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card className="py-0 w-full border-0 shadow-none mt-2 bg-none">
            {/* <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader> */}
            <CardContent className="grid gap-4 px-0 border-0 bg-none">
              {activeCityIds?.map((cityId) => {
                const cityData = cityDataMap[cityId];
                console.log(cityId, cityData, "cityData");
                return (
                  <YearlyWeatherIcons
                    key={cityId}
                    cityLabel={cityData?.name || cityId}
                    showSunnyDays={showSunnyDays}
                    ratings={
                      cityData?.weatherRatings?.map((wr) => {
                        if (wr === 5) {
                          return 4; // or some default value
                        } else if (wr === 7) {
                          return 6;
                        } else if (wr > 4) {
                          return wr - 3; // Adjusting the rating
                        }
                        return wr;
                      }) as any
                    }
                    sunnyDaysByPeriod={
                      cityData?.name === "San Diego"
                        ? sdSunnyDaysByPeriod
                        : undefined
                    }
                  />
                );
              })}
            </CardContent>
            {/* <CardFooter>
              <Button>Save password</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
