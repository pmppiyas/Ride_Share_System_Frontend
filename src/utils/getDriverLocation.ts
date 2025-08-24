import type { Driver } from "@/types";

export const getDriverCoordinates = (
  driver: Driver
): [number, number] | null => {
  try {
    const coords = driver.location?.coordinates;

    if (
      Array.isArray(coords) &&
      typeof coords[0] === "number" &&
      typeof coords[1] === "number" &&
      !isNaN(coords[0]) &&
      !isNaN(coords[1])
    ) {
      const [lng, lat] = coords;
      return [lat, lng];
    }

    return null;
  } catch (error) {
    console.warn("Error getting driver coordinates:", error, driver);
    return null;
  }
};
