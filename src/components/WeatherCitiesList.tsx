import { MapPin } from "lucide-react";

const cities = [
  { rank: 1, name: "San Diego", country: "USA", condition: "Sunny" },
  { rank: 2, name: "Nice", country: "France", condition: "Clear" },
  { rank: 3, name: "Honolulu", country: "Hawaii", condition: "Partly Cloudy" },
  { rank: 4, name: "Santa Barbara", country: "USA", condition: "Sunny" },
  { rank: 5, name: "Las Palmas", country: "Spain", condition: "Clear" },
  { rank: 6, name: "Perth", country: "Australia", condition: "Sunny" },
  { rank: 7, name: "Kunming", country: "China", condition: "Mild" },
  { rank: 8, name: "Medellín", country: "Colombia", condition: "Pleasant" },
  { rank: 9, name: "Barcelona", country: "Spain", condition: "Clear" },
  { rank: 10, name: "Los Angeles", country: "USA", condition: "Sunny" },
  { rank: 11, name: "Lisbon", country: "Portugal", condition: "Clear" },
  {
    rank: 12,
    name: "Sydney",
    country: "Australia",
    condition: "Partly Cloudy",
  },
  { rank: 13, name: "Málaga", country: "Spain", condition: "Sunny" },
  { rank: 14, name: "Tel Aviv", country: "Israel", condition: "Clear" },
  { rank: 15, name: "Montevideo", country: "Uruguay", condition: "Mild" },
  { rank: 16, name: "Cape Town", country: "South Africa", condition: "Clear" },
  { rank: 17, name: "Viña del Mar", country: "Chile", condition: "Pleasant" },
  { rank: 18, name: "Casablanca", country: "Morocco", condition: "Clear" },
  { rank: 19, name: "Limassol", country: "Cyprus", condition: "Sunny" },
  { rank: 20, name: "Durban", country: "South Africa", condition: "Warm" },
];

export default function WeatherCitiesList() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="font-heading font-black text-3xl text-gray-100 mb-2 text-center">
        Top 20 Cities
      </h1>
      <p className="text-gray-200 text-center mb-8">
        Worldwide rankings by best weather
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {cities.map((city) => (
          <div
            key={city.rank}
            className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 w-6">
                  #{city.rank}
                </span>
                <h3 className="font-heading font-bold text-gray-900 truncate">
                  {city.name}
                </h3>
                <span className="text-sm text-gray-600">{city.country}</span>
              </div>
            </div>

            <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
              <MapPin className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
