import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// テストの方針は docs/testing/test-plan.md を参照
export default defineConfig({
  plugins: [react()],
  // tsconfig.json の paths（@/*）を解決する
  resolve: { tsconfigPaths: true },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/unit/**/*.test.ts"],
          setupFiles: ["tests/setup/unit.ts"],
        },
      },
    ],
  },
});
