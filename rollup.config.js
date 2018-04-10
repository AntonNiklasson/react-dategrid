import babel from "rollup-plugin-babel";

export default {
  input: "lib/dategrid.js",
  output: {
    file: "dist/react-dategrid.js",
    format: "umd",
    name: "Dategrid"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ]
};
