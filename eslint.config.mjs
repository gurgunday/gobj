import grules from "grules";
import globals from "globals";

export default [
  ...grules,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
