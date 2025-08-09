import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import data from "@/data/cities.json";

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
          });

          mapRef.current?.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
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
