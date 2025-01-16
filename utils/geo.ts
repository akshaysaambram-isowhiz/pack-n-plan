export const geo = {
  calculateDistance: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  formatDistance: (distance: number, unit: "km" | "mi" = "km"): string => {
    if (unit === "mi") {
      distance *= 0.621371;
    }
    return `${Math.round(distance * 10) / 10} ${unit}`;
  },

  isWithinRadius: (
    centerLat: number,
    centerLon: number,
    pointLat: number,
    pointLon: number,
    radius: number,
  ): boolean => {
    const distance = geo.calculateDistance(
      centerLat,
      centerLon,
      pointLat,
      pointLon,
    );
    return distance <= radius;
  },
};
