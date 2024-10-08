"use strict";

module.exports.Obj = class {
  #map = new Map();

  /**
   * @param {object} initialData initialData
   * @returns {object} object
   */
  constructor(initialData = {}) {
    for (const key of Object.keys(initialData)) {
      this.#map.set(key, initialData[key]);
    }

    return new Proxy(this, {
      ownKeys: (target) => {
        return Array.from(target.#map.keys());
      },
      has: (target, prop) => {
        return target.#map.has(prop) || prop in Object.getPrototypeOf(target);
      },
      get: (target, prop, receiver) => {
        if (target.#map.has(prop)) {
          return target.#map.get(prop);
        }

        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value) => {
        target.#map.set(prop, value);

        return true;
      },
      defineProperty: (target, prop, descriptor) => {
        if (descriptor.get || descriptor.set) {
          throw new TypeError("Getter/Setter properties are not supported");
        }

        target.#map.set(prop, descriptor.value);

        return true;
      },
      deleteProperty: (target, prop) => {
        if (target.#map.has(prop)) {
          return target.#map.delete(prop);
        }

        return true;
      },
      getOwnPropertyDescriptor: (target, prop) => {
        if (target.#map.has(prop)) {
          return {
            configurable: true,
            enumerable: true,
            value: target.#map.get(prop),
            writable: true,
          };
        }
      },
    });
  }
};
