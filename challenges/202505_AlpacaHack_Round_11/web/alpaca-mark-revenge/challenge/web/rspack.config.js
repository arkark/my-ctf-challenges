import { defineConfig } from "@rspack/cli";

export default defineConfig({
  entry: {
    main: "./client/index.js",
  },
  experiments: {
    css: true,
  },
  devtool: false,
});
