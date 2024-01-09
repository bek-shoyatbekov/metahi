import { toRadians } from "./to-radians";

interface GeoPoint {
  latitude: number;
  longitude: number;
}

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

  return earthRadius * c;
}

export default calculateDistance;
