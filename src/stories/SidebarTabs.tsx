import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterByMonth from "./FilterByMonth";
import { HeartIcon } from "lucide-react";
import { YearlyWeatherIcons } from "./WeatherRatings";

export function SidebarTabs() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6 mt-6">
      <Tabs defaultValue="password">
        <TabsList>
          {/* <TabsTrigger value="account">Time Periods</TabsTrigger> */}
          <TabsTrigger value="password">
            <HeartIcon className="stroke-0 fill-gray-600" /> My Cities
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="py-0 w-full">
            {/* <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader> */}
            <CardContent className="grid gap-6 px-0">
              <FilterByMonth
                className="mt-4"
                // initialActiveMonth={getCurrentMonthHalfIndex()}
              />
            </CardContent>
            {/* <CardFooter>
              <Button>Save changes</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="py-0 w-full">
            {/* <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader> */}
            <CardContent className="grid gap-6 px-0">
              <YearlyWeatherIcons cityLabel="Boston" />
              <YearlyWeatherIcons cityLabel="San Francisco" />
              <YearlyWeatherIcons cityLabel="Seattle" />
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
