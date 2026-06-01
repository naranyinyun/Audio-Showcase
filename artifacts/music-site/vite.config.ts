import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// =======================
// 1. 基础配置（安全默认值）
// =======================

// ❗ 不再强制要求环境变量
// 生产 / Vercel / Replit 都不会炸

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH ?? "/";

// =======================
// 2. 条件插件（Replit 专用增强）
// =======================

const isReplit =
  process.env.NODE_ENV !== "production" &&
  process.env.REPL_ID !== undefined;

// =======================
// 3. Vite Config
// =======================

export default defineConfig({
  base: basePath,

  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),

    // 只在 Replit 开发环境启用
    ...(isReplit
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(
        import.meta.dirname,
        "..",
        "..",
        "attached_assets",
      ),
    },
    dedupe: ["react", "react-dom"],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },

  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },

  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
