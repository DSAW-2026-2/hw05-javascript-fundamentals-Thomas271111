import globals from "globals";

export default [
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
        // Definido en validation.js, usado en main.js — ambos son scripts
        // clásicos (no módulos) cargados en el mismo <head>/<body>.
        CorralValidation: "writable",
      },
    },
    rules: {
      "no-var": "error",
      eqeqeq: "error",
      "no-unused-vars": "warn",
    },
  },
];
