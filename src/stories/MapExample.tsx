import { useCallback, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import data from "@/data/cities.json";
import { getIconNameByDigit } from "./WeatherIcon";
import { useSelectedPeriod } from "./SelectedPeriodContext";
// import FilterByMonth from "./FilterByMonth";
import SlidingPopupButtons from "@/components/sliding-popup-buttons";
import { ShowSunnyDaysToggle } from "./ShowSunnyDaysToggle";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const createGeoJsonData = (period: number, showSunnyDays: boolean) => ({
  type: "FeatureCollection" as const,
  features: data.map((location: any) => ({
    type: "Feature" as const,
    properties: {
      id: location.id,
      name: location.name,
      title: location.name,
      rating: location.rating,
      type: getIconNameByDigit(location.weatherRatings?.[period] || 1),
      sunnyDot: showSunnyDays
        ? location.weatherRatings?.[period] === 5 ||
          location.weatherRatings?.[period] === 7
        : false, // new
    },
    geometry: {
      type: "Point" as const,
      coordinates:
        typeof location.latLng === "string"
          ? location.latLng.split(",").map(Number).reverse()
          : location.latLng?.reverse(),
    },
  })),
});

const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // const [selectedPeriod, setSelectedPeriod] = useState<number>(0); // 0–23
  const { selectedPeriod, showSunnyDays, setActiveCityIds } =
    useSelectedPeriod();

  // Keep a ref to the current data so we can update without recreating map
  const geoJsonRef = useRef(createGeoJsonData(selectedPeriod, showSunnyDays));

  // Function to update the icons when period changes
  const updateMapData = useCallback(
    (period: number, showSunnyDays: boolean) => {
      geoJsonRef.current = createGeoJsonData(period, showSunnyDays);
      const source = mapRef.current?.getSource(
        "points"
      ) as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData(geoJsonRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
      config: {
        // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
        basemap: {
          // Here, we're disabling all of the 3D layers such as landmarks, trees, and 3D extrusions.
          showPlaceLabels: true, // false,
          showRoadLabels: false,
          showPointOfInterestLabels: false,
          showTransitLabels: false,
          // theme: "monochrome",
        },
      },
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    mapRef.current.on("style.load", () => {});

    mapRef.current.on("load", () => {
      // First, load all icons as Mapbox images

      const iconNames = [
        "cold",
        "brisk",
        "cool",
        "mild",
        "warm",
        "hot",
        "veryhot",
      ];

      mapRef.current?.addSource("points", {
        type: "geojson",
        data: geoJsonRef.current,
        generateId: true,
        cluster: false,
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        anchor: "top-left",
      });

      Promise.all(
        iconNames.map(
          (name) =>
            new Promise<void>((resolve, reject) => {
              mapRef.current?.loadImage(
                `/icons/${name}.webp`,
                (error, image) => {
                  if (error || !image) return reject(error);
                  if (!mapRef.current?.hasImage(name)) {
                    mapRef.current?.addImage(name, image);
                  }
                  resolve();
                }
              );
            })
        )
      )
        .then(() => {
          iconNames.forEach((name) => {
            // ICON LAYER (always shows)
            mapRef.current?.addLayer({
              id: `${name}-icon`,
              type: "symbol",
              source: "points",
              filter: ["==", ["get", "type"], name],
              layout: {
                "icon-image": name,
                "icon-size": 1,
                "icon-anchor": "bottom",
                "icon-allow-overlap": true, // icons never hide
              },
            });
            mapRef.current?.addLayer({
              id: `${name}-label`,
              type: "symbol",
              source: "points",
              filter: ["==", ["get", "type"], name],
              layout: {
                "text-field": ["get", "name"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-size": 10,
                "text-offset": [0, 0.6],
                "text-anchor": "top",
                "text-allow-overlap": false, // still hides on overlap
                "text-ignore-placement": false, // but only considers other text
                "text-padding": 1, // smaller collision box
                "symbol-sort-key": ["-", ["get", "rating"]], // higher rating = higher priority
              },
              paint: {
                "text-color": "#000",
                "text-halo-color": "#fff",
                "text-halo-width": 1,
              },
            });

            mapRef.current?.addInteraction(`${name}-icon-click`, {
              type: "click",
              target: { layerId: `${name}-icon` },
              handler: (e) => {
                if (!e.feature || !mapRef.current) return;

                const id = e.feature.properties?.id as string;
                setActiveCityIds((prev) => {
                  if (prev.includes(id)) {
                    return prev.filter((cityId) => cityId !== id);
                  } else {
                    return [...prev, id];
                  }
                });
                // Populate the popup and set its coordinates based on the feature found.
              },
            });

            mapRef.current?.addInteraction(`${name}-icon-mouseenter`, {
              type: "mouseenter",
              target: { layerId: `${name}-icon` },
              handler: (e) => {
                console.log("Mouse enter on places layer", e.feature);
                if (!e.feature || !mapRef.current) return;
                mapRef.current.getCanvas().style.cursor = "pointer";
                const coordinates = (
                  e.feature.geometry as GeoJSON.Point
                ).coordinates.slice() as [number, number];
                const description = e.feature.properties?.name as string;
                // Populate the popup and set its coordinates based on the feature found.
                popup
                  .setLngLat(coordinates)
                  .addClassName("mapboxgl-popup")
                  // .setOffset([0, -25]) // Offset to position above the icon
                  .setHTML(description)
                  .addTo(mapRef.current);
              },
            });

            mapRef.current?.addInteraction(`${name}-icon-mouseleave`, {
              type: "mouseleave",
              target: { layerId: `${name}-icon` },
              handler: () => {
                if (!mapRef.current) return;
                mapRef.current.getCanvas().style.cursor = "";
                // mapRef.current && mapRef.current.getCanvas().style.cursor = '';
                popup.remove();
              },
            });
          });
        })
        .catch((err) => {
          console.error("Error loading images:", err);
        });

      mapRef.current?.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error || !image) throw error;

          mapRef.current?.addImage("custom-marker", image);

          mapRef.current?.addLayer({
            id: "clusters",
            type: "circle",
            source: "points",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40,
              ],
              "circle-emissive-strength": 1,
            },
          });
          mapRef.current?.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "points",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          //   mapRef.current?.addLayer({
          //     id: "unclustered-point",
          //     type: "circle",
          //     source: "points",
          //     filter: ["!", ["has", "point_count"]],
          //     paint: {
          //       "circle-color": "#11b4da",
          //       "circle-radius": 4,
          //       "circle-stroke-width": 1,
          //       "circle-stroke-color": "#fff",
          //       "circle-emissive-strength": 1,
          //     },
          //   });
          //   mapRef.current?.addLayer({
          //     id: "points",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["!", ["has", "point_count"]],
          //     layout: {
          //       "icon-image": "custom-marker",
          //       "text-field": ["get", "title"],
          //       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          //       "text-offset": [0, 1.25],
          //       "text-anchor": "top",
          //     },
          //   });

          // Cold - solid circle
          //   mapRef.current?.addLayer({
          //     id: "cold",
          //     type: "circle",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "cold"],
          //     paint: {
          //       "circle-radius": 8,
          //       "circle-color": "#000",
          //     },
          //   });

          //   // Brisk - solid circle + white vertical line
          //   mapRef.current?.addLayer({
          //     id: "brisk-circle",
          //     type: "circle",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "brisk"],
          //     paint: {
          //       "circle-radius": 8,
          //       "circle-color": "#000",
          //     },
          //   });
          //   mapRef.current?.addLayer({
          //     id: "brisk-line",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "brisk"],
          //     layout: {
          //       "text-field": "|",
          //       "text-font": ["Arial Unicode MS Regular"],
          //       "text-size": 24,
          //     },
          //     paint: {
          //       "text-color": "#fff",
          //     },
          //   });

          //   // Cool - diamond with stroke, half filled
          //   mapRef.current?.addLayer({
          //     id: "cool-diamond-fill",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "cool"],
          //     layout: {
          //       "text-field": "◆",
          //       "text-font": ["Arial Unicode MS Regular"],
          //       "text-size": 24,
          //     },
          //     paint: { "text-color": "#007BFF" },
          //   });
          //   mapRef.current?.addLayer({
          //     id: "cool-diamond-outline",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "cool"],
          //     layout: {
          //       "text-field": "◇",
          //       "text-font": ["Arial Unicode MS Regular"],
          //       "text-size": 24,
          //     },
          //     paint: { "text-color": "#000" },
          //   });

          //   // Mild - solid diamond
          //   mapRef.current?.addLayer({
          //     id: "mild",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "mild"],
          //     layout: {
          //       "text-field": "◆",
          //       "text-font": ["Arial Unicode MS Regular"],
          //       "text-size": 24,
          //     },
          //     paint: { "text-color": "#007BFF" },
          //   });

          //   // Warm - diamond outline only
          //   mapRef.current?.addLayer({
          //     id: "warm",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "warm"],
          //     layout: {
          //       "text-field": "◇",
          //       "text-font": ["Arial Unicode MS Regular"],
          //       "text-size": 24,
          //     },
          //     paint: { "text-color": "#007BFF" },
          //   });

          //   // Hot - outline circle with vertical line
          //   mapRef.current?.addLayer({
          //     id: "hot-circle",
          //     type: "circle",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "hot"],
          //     paint: {
          //       "circle-radius": 8,
          //       "circle-color": "transparent",
          //       "circle-stroke-color": "#000",
          //       "circle-stroke-width": 2,
          //     },
          //   });
          //   mapRef.current?.addLayer({
          //     id: "hot-line",
          //     type: "symbol",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "hot"],
          //     layout: {
          //       "text-field": "|",
          //       "text-font": ["Arial Unicode MS Regular"],
          //       "text-size": 24,
          //     },
          //     paint: {
          //       "text-color": "#000",
          //     },
          //   });

          //   // Very Hot - circle outline only
          //   mapRef.current?.addLayer({
          //     id: "veryhot",
          //     type: "circle",
          //     source: "points",
          //     filter: ["==", ["get", "type"], "veryhot"],
          //     paint: {
          //       "circle-radius": 8,
          //       "circle-color": "transparent",
          //       "circle-stroke-color": "#000",
          //       "circle-stroke-width": 2,
          //     },
          //   });
        }
      );
    });
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  mapRef.current?.addLayer({
    id: "sunny-dot",
    type: "circle",
    source: "points",
    filter: ["==", ["get", "sunnyDot"], true],
    paint: {
      "circle-radius": 3,
      "circle-color": "#ffdf20",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#999",
      "circle-emissive-strength": 1,
      "circle-translate": [0, -20], // moves it up 10px if needed
    },
    layout: {
      // Force to draw on top of icons
      visibility: "visible",
    },
  });

  useEffect(() => {
    if (mapRef.current) {
      updateMapData(selectedPeriod, showSunnyDays);
    }
  }, [selectedPeriod, showSunnyDays, updateMapData]);
  // const [monthName, halfLabel] = getMonthAndHalf(selectedPeriod);
  return (
    <div
      className="relative bg-accent rounded-lg__ border justify-between"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-normal  px-2 my-1 text-gray-800">
            Select a Time Period
          </h2>
          <ShowSunnyDaysToggle className="col-span-7 pt-0 relative top-1 text-accent-foreground text-xs" />
        </div>
        <SlidingPopupButtons showSunnyDays={false} />
      </div>
      <div
        ref={mapContainerRef}
        // style={{ flex: 1 }}
        className="map-container rounded-b-lg h-[calc(100%-0px)] w-full"
      />
      {/* <div className="min-w-[310px] w-[310px] border-0 bg-blue-500 font-semibold text-accent text-3xl px-5 py-3 absolute top-16 right-2 rounded-sm">
        <div className="text-xs opacity-75">
          Displaying 600 Comfort Zones Worldwide
        </div>
        {monthName}{" "}
        <span className="text-[16px] font-semibold">
          &nbsp; <sup className="relative top-[0px] text-lg">{halfLabel}</sup>
        </span>
      </div> */}
    </div>
  );
};

export default MapboxExample;

export function getMonthAndHalf(period: number): [string, string] {
  const monthIndex = Math.floor(period / 2); // 0–11
  const date = new Date(2000, monthIndex, 1); // Arbitrary year & day

  const monthName = new Intl.DateTimeFormat("en", { month: "long" }).format(
    date
  );
  const halfLabel = period % 2 === 0 ? "First Half" : "Second Half";

  return [monthName, halfLabel];
}
