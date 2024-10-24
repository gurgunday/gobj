"use strict";

const _getPrototypeOf = Object.getPrototypeOf;
const _keys = Object.keys;
const _get = Reflect.get;

const _from = Array.from;

const Obj = class {
  #map;

  /**
   * @param {object} data data
   * @throws {TypeError}
   */
  constructor(data) {
    this.#map = new Map();

    if (typeof data === "object") {
      for (const key of _keys(data)) {
        this.#map.set(key, data[key]);
      }
    }

    return new Proxy(this, {
      ownKeys: (target) => {
        return _from(target.#map.keys());
      },
      has: (target, prop) => {
        return target.#map.has(prop) || prop in _getPrototypeOf(target);
      },
      get: (target, prop, receiver) => {
        return target.#map.has(prop)
          ? target.#map.get(prop)
          : _get(target, prop, receiver);
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
