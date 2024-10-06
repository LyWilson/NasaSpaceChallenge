import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "frontEnd", // Point to the folder containing index.html
  base: "/vite-react-deploy/", // YOUR REPO NAME HERE
  build: {
    outDir: "../dist", // Adjust the output directory as needed
    rollupOptions: {
      input: {
        main: "index.html", // Ensure this is the correct relative path
      },
    },
  },
});