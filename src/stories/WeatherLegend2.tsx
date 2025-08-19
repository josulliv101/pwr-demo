import { weatherDetails } from "./WeatherIconLegend";
import { weatherIconMap2 } from "./WeatherIcon";

export default function WeatherLegend2() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-heading font-black text-2xl text-gray-900 mb-2 text-center">
        Weather Legend
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Understanding temperature ranges
      </p>

      <div className="space-y-1">
        {Object.entries(weatherDetails).map(([key, details], index) => {
          const Icon = weatherIconMap2[key as keyof typeof weatherIconMap2];
          return (
            <div
              key={index}
              className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                <Icon.component className="w-4 h-4 text-gray-500" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-gray-900">
                      {key}
                    </h3>
                    {/* <span className="text-sm text-gray-600">
                      {details.description}
                    </span> */}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {details.clothing}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
