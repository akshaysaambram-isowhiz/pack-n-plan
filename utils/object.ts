export const object = {
  pick: <T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  omit: <T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
  },

  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as any;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => object.deepClone(item)) as any;
    }

    return Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        [key]: object.deepClone((obj as any)[key]),
      };
    }, {}) as T;
  },

  isEqual: (a: any, b: any): boolean => {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== "object") return false;
    if (a === null || b === null) return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => object.isEqual(a[key], b[key]));
  },
};
