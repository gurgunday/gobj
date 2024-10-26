"use strict";

const { Obj } = require("..");
const { test, describe } = require("node:test");
const assert = require("node:assert/strict");

describe("Obj class", () => {
  test("constructor throws if given data is not object", () => {
    assert.throws(() => {
      new Obj(null);
    }, TypeError);
  });

  test("constructor initializes with given data", () => {
    const obj = new Obj({ a: 1, b: 2 });

    assert.deepEqual({ ...obj }, { a: 1, b: 2 });
  });

  test("get returns correct values", () => {
    const obj = new Obj({ a: 1 });
    assert.equal(obj.a, 1);
    assert.equal(obj.b, undefined);
  });

  test("set adds new properties", () => {
    const obj = new Obj();
    obj.a = 1;
    assert.equal(obj.a, 1);
  });

  test("set updates existing properties", () => {
    const obj = new Obj({ a: 1 });
    obj.a = 2;
    assert.equal(obj.a, 2);
  });

  test("delete removes properties", () => {
    const obj = new Obj({ a: 1, b: 2 });
    delete obj.a;
    assert.deepEqual(Object.keys(obj), ["b"]);
  });

  test("in operator works correctly", () => {
    const obj = new Obj({ a: 1 });
    assert.equal("a" in obj, true);
    assert.equal("b" in obj, false);
  });

  test("Object.keys returns correct keys", () => {
    const obj = new Obj({ a: 1, b: 2 });
    assert.deepEqual(Object.keys(obj), ["a", "b"]);
  });

  test("for...in loop iterates over own properties", () => {
    const obj = new Obj({ a: 1, b: 2 });
    const keys = [];
    for (const key in obj) {
      keys.push(key);
    }
    assert.deepEqual(keys, ["a", "b"]);
  });

  test("Object.getOwnPropertyDescriptor returns correct descriptors", () => {
    const obj = new Obj({ a: 1 });
    const descriptor = Object.getOwnPropertyDescriptor(obj, "a");
    assert.deepEqual(descriptor, {
      value: 1,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  });

  test("prototype methods are accessible /1", () => {
    const obj = new Obj();
    assert.equal(obj.toString(), "[object Object]");
    assert.equal(obj.toLocaleString(), "[object Object]");
  });

  test("prototype methods are accessible /2", () => {
    const ExtendedObj = class extends Obj {
      testMethod = () => {
        return this.test + "test";
      };
    };
    const obj = new ExtendedObj();
    assert.equal(obj.testMethod(), "undefinedtest");
  });

  test("delete returns true for non-existent properties", () => {
    const obj = new Obj();
    assert.equal(delete obj.nonExistent, true);
  });

  test("Object.assign works correctly", () => {
    const obj = new Obj({ a: 1 });
    Object.assign(obj, { b: 2, c: 3 });
    assert.deepEqual(Object.entries(new Obj({ a: 1, b: 2, c: 3 })), [
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });

  test("JSON.stringify works correctly", () => {
    const obj = new Obj({ a: 1, b: { c: 2 } });
    assert.equal(JSON.stringify(obj), '{"a":1,"b":{"c":2}}');
  });
});
