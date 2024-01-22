import { GeoPoint } from "../../interfaces/geo-point-interface";
import { logger } from "../log/logger";
import { toRadians } from "./to-radians";



function calculateDistance(point1: GeoPoint, point2: GeoPoint): number {
  const earthRadius = 6371.0; // Radius of Earth in kilometers

  
  const lat1 = toRadians(point1.latitude);
  const lon1 = toRadians(point1.longitude);

  const lat2 = toRadians(point2.latitude);
  const lon2 = toRadians(point2.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c * 1000;
}

// ! Example
// logger.info(
//   calculateDistance(
//     { latitude: 41.308042, longitude: 69.283235 },
//     { latitude: 41.3078, longitude: 69.282762 }
//   )
// );

export default calculateDistance;
