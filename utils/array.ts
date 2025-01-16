export const array = {
  chunk: <T>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size),
    );
  },

  shuffle: <T>(arr: T[]): T[] => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  unique: <T>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
  },

  groupBy: <T>(arr: T[], key: keyof T): { [key: string]: T[] } => {
    return arr.reduce(
      (groups, item) => {
        const groupKey = String(item[key]);
        return {
          ...groups,
          [groupKey]: [...(groups[groupKey] || []), item],
        };
      },
      {} as { [key: string]: T[] },
    );
  },

  sortBy: <T>(arr: T[], key: keyof T, order: "asc" | "desc" = "asc"): T[] => {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    });
  },
};
