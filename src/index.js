"use strict";

module.exports.Obj = class Obj {
  #map = new Map();

  constructor(initialData = {}) {
    for (const [key, value] of Object.entries(initialData)) {
      this.#map.set(key, value);
    }

    this.toString = this.toString.bind(this);

    return new Proxy(this, {
      has(target, prop) {
        return target.#map.has(prop) || prop in Object.getPrototypeOf(target);
      },
      get(target, prop, receiver) {
        if (target.#map.has(prop)) {
          return target.#map.get(prop);
        }

        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value) {
        target.#map.set(prop, value);

        return true;
      },
      deleteProperty(target, prop) {
        if (target.#map.has(prop)) {
          return target.#map.delete(prop);
        }

        return true;
      },
      ownKeys(target) {
        return Array.from(target.#map.keys());
      },
      getOwnPropertyDescriptor(target, prop) {
        if (target.#map.has(prop)) {
          return {
            configurable: true,
            enumerable: true,
            value: target.#map.get(prop),
            writable: true,
          };
        }

        return undefined;
      },
      defineProperty(target, prop, descriptor) {
        if (descriptor.get || descriptor.set) {
          throw new TypeError("Getter/Setter properties are not supported");
        }

        target.#map.set(prop, descriptor.value);

        return true;
      },
    });
  }

  toString() {
    return JSON.stringify(Object.fromEntries(this.#map));
  }
};
