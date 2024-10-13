"use strict";

const Obj = class {
  #map;

  /**
   * @param {object} data data
   * @throws {TypeError}
   */
  constructor(data) {
    this.#map = new Map();

    if (typeof data === "object") {
      for (const key of Object.keys(data)) {
        this.#map.set(key, data[key]);
      }
    }

    return new Proxy(this, {
      ownKeys: (target) => {
        return Array.from(target.#map.keys());
      },
      has: (target, prop) => {
        return target.#map.has(prop) || prop in Object.getPrototypeOf(target);
      },
      get: (target, prop, receiver) => {
        return target.#map.has(prop)
          ? target.#map.get(prop)
          : Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value) => {
        target.#map.set(prop, value);

        return true;
      },
      defineProperty: (target, prop, descriptor) => {
        target.#map.set(prop, descriptor.value);

        return true;
      },
      deleteProperty: (target, prop) => {
        target.#map.delete(prop);

        return true;
      },
      getOwnPropertyDescriptor: (target, prop) => {
        if (target.#map.has(prop)) {
          return {
            value: target.#map.get(prop),
            writable: true,
            enumerable: true,
            configurable: true,
          };
        }
      },
    });
  }
};

module.exports.Obj = Obj;
