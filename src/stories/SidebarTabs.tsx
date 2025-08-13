import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { HeartIcon } from "lucide-react";
import { YearlyWeatherIcons } from "./WeatherRatings";

export function SidebarTabs({ showSunnyDays }: { showSunnyDays?: boolean }) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mt-6 overflow-y-auto">
      <Tabs defaultValue="password">
        <TabsList className="bg-none">
          {/* <TabsTrigger value="account">Time Periods</TabsTrigger> */}
          <TabsTrigger value="password">
            <HeartIcon className="stroke-0 fill-gray-600" /> My Cities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card className="py-0 w-full border-0 shadow-none ">
            {/* <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader> */}
            <CardContent className="grid gap-6 px-0 border-0 ">
              <YearlyWeatherIcons
                cityLabel="Boston"
                showSunnyDays={showSunnyDays}
              />
              <YearlyWeatherIcons
                cityLabel="San Francisco"
                showSunnyDays={showSunnyDays}
              />
              <YearlyWeatherIcons
                cityLabel="Seattle"
                showSunnyDays={showSunnyDays}
              />
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
