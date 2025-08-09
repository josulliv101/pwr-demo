import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import data from "@/data/cities.json";
import { getIconNameByDigit } from "./WeatherIcon";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const geoJsonData: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
  type: "FeatureCollection",
  features: data.map((location: any) => ({
    type: "Feature",
    properties: {
      id: location.id,
      name: location.name,
      title: location.name,
      rating: location.rating,
      type: getIconNameByDigit(location.weatherRatings?.[7] || 1), // Example static value, replace with actual logic if needed
      // weatherPeriods: getLocationWeatherPeriods(
      //   location.weatherPeriods
      // ).map(convertWeatherPeriodValueToIcon),
    },
    geometry: {
      type: "Point",
      coordinates:
        typeof location.latLng === "string"
          ? location.latLng.split(",").map(Number).reverse()
          : location.latLng?.reverse(),
    },
  })),
};
console.log("geoJsonData", geoJsonData);
const MapboxExample = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });

    mapRef.current.on("style.load", () => {});

    mapRef.current.on("load", () => {
      mapRef.current?.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error || !image) throw error;

          mapRef.current?.addImage("custom-marker", image);

          mapRef.current?.addSource("points", {
            type: "geojson",
            data: geoJsonData,
            generateId: true,
            cluster: false,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to
          });

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
          mapRef.current?.addLayer({
            id: "cold",
            type: "circle",
            source: "points",
            filter: ["==", ["get", "type"], "cold"],
            paint: {
              "circle-radius": 8,
              "circle-color": "#000",
            },
          });

          // Brisk - solid circle + white vertical line
          mapRef.current?.addLayer({
            id: "brisk-circle",
            type: "circle",
            source: "points",
            filter: ["==", ["get", "type"], "brisk"],
            paint: {
              "circle-radius": 8,
              "circle-color": "#000",
            },
          });
          mapRef.current?.addLayer({
            id: "brisk-line",
            type: "symbol",
            source: "points",
            filter: ["==", ["get", "type"], "brisk"],
            layout: {
              "text-field": "|",
              "text-font": ["Arial Unicode MS Regular"],
              "text-size": 24,
            },
            paint: {
              "text-color": "#fff",
            },
          });

          // Cool - diamond with stroke, half filled
          mapRef.current?.addLayer({
            id: "cool-diamond-fill",
            type: "symbol",
            source: "points",
            filter: ["==", ["get", "type"], "cool"],
            layout: {
              "text-field": "◆",
              "text-font": ["Arial Unicode MS Regular"],
              "text-size": 24,
            },
            paint: { "text-color": "#007BFF" },
          });
          mapRef.current?.addLayer({
            id: "cool-diamond-outline",
            type: "symbol",
            source: "points",
            filter: ["==", ["get", "type"], "cool"],
            layout: {
              "text-field": "◇",
              "text-font": ["Arial Unicode MS Regular"],
              "text-size": 24,
            },
            paint: { "text-color": "#000" },
          });

          // Mild - solid diamond
          mapRef.current?.addLayer({
            id: "mild",
            type: "symbol",
            source: "points",
            filter: ["==", ["get", "type"], "mild"],
            layout: {
              "text-field": "◆",
              "text-font": ["Arial Unicode MS Regular"],
              "text-size": 24,
            },
            paint: { "text-color": "#007BFF" },
          });

          // Warm - diamond outline only
          mapRef.current?.addLayer({
            id: "warm",
            type: "symbol",
            source: "points",
            filter: ["==", ["get", "type"], "warm"],
            layout: {
              "text-field": "◇",
              "text-font": ["Arial Unicode MS Regular"],
              "text-size": 24,
            },
            paint: { "text-color": "#007BFF" },
          });

          // Hot - outline circle with vertical line
          mapRef.current?.addLayer({
            id: "hot-circle",
            type: "circle",
            source: "points",
            filter: ["==", ["get", "type"], "hot"],
            paint: {
              "circle-radius": 8,
              "circle-color": "transparent",
              "circle-stroke-color": "#000",
              "circle-stroke-width": 2,
            },
          });
          mapRef.current?.addLayer({
            id: "hot-line",
            type: "symbol",
            source: "points",
            filter: ["==", ["get", "type"], "hot"],
            layout: {
              "text-field": "|",
              "text-font": ["Arial Unicode MS Regular"],
              "text-size": 24,
            },
            paint: {
              "text-color": "#000",
            },
          });

          // Very Hot - circle outline only
          mapRef.current?.addLayer({
            id: "veryhot",
            type: "circle",
            source: "points",
            filter: ["==", ["get", "type"], "veryhot"],
            paint: {
              "circle-radius": 8,
              "circle-color": "transparent",
              "circle-stroke-color": "#000",
              "circle-stroke-width": 2,
            },
          });
        }
      );
    });
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div
      style={{ height: "100%" }}
      ref={mapContainerRef}
      className="map-container rounded-lg"
    />
  );
};

export default MapboxExample;
