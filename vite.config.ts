import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => ({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        strictPort: true,
    },
    build: {
        // cssMinify: 'lightningcss',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}));
