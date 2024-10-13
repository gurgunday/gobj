# gobj ![img.shields.io/bundlephobia/minzip/gobj](https://img.shields.io/bundlephobia/minzip/gobj)

snu**gobj**ect is a mutable JavaScript object with an immutable hidden class.

Works in the browser. No runtime dependencies. Drop-in\* replacement to objects. [Get more out of your JS engine.](https://stackoverflow.com/questions/62350146/why-map-manipulation-is-much-slower-than-object-in-javascript-v8-for-integ/62351925#62351925)

![gobj.gif](./gobj.gif)

## Installation

```sh
npm i gobj
```

Or import directly from a CDN:

```js
import { Obj } from "https://cdn.jsdelivr.net/npm/gobj/+esm";
```

## API

### `Obj`

The `Obj` class creates a mutable JavaScript object with an immutable hidden class, powered by a `Map` and a `Proxy`.

#### Constructor

```js
new Obj(data);
```

- `data` (object, optional): The initial data to populate the object with.

The constructor may throw:

- `TypeError`: If `data` is `null`.

## Usage

```js
import { Obj } from "gobj";

const obj = new Obj({
  name: "John Doe",
  age: 30,
});

console.log(obj.name); // Output: "John Doe"
console.log(obj.age); // Output: 30

obj.email = "john@example.com";
console.log(obj.email); // Output: "john@example.com"

delete obj.age; // Output: true
console.log(obj.age); // Output: undefined

console.log(Object.keys(obj)); // Output: ["name", "email"]
console.log(JSON.stringify(obj)); // Output: '{"name":"John Doe","email":"john@example.com"}'
```

`Obj` supports all standard object operations, including property access, modification, deletion, and iteration.
