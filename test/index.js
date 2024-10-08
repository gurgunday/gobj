"use strict";

const { strict: assert } = require("node:assert");
const { test, describe } = require("node:test");
const { Obj } = require("../src");

describe("Obj class", () => {
  test("constructor initializes with given data", () => {
    const obj = new Obj({ a: 1, b: 2 });
    assert.deepEqual(Object.entries(obj), [
      ["a", 1],
      ["b", 2],
    ]);
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

  test("toString returns JSON representation", () => {
    const obj = new Obj({ a: 1, b: 2 });
    assert.equal(obj.toString(), '{"a":1,"b":2}');
  });

  test("prototype methods are accessible", () => {
    class ExtendedObj extends Obj {
      testMethod() {
        return "test";
      }
    }
    const obj = new ExtendedObj();
    assert.equal(obj.testMethod(), "test");
  });

  test("delete returns true for non-existent properties", () => {
    const obj = new Obj();
    assert.equal(delete obj.nonExistent, true);
  });

  test("Object.assign works correctly", () => {
    const obj = new Obj({ a: 1 });
    Object.assign(obj, { b: 2, c: 3 });
    assert.deepEqual(Object.entries(obj), [
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
