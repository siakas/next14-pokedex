import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tailwind from "eslint-plugin-tailwindcss";

// eslint-config-next@15 は eslintrc 形式の設定だけを提供しているため、FlatCompat で読み込む
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default [
  // 旧 .eslintignore の内容（gitignore と同じく、"/" を含まないパターンはどの階層にも当てはまる）
  {
    ignores: [
      "**/node_modules/",
      "**/.next/",
      "**/.nuxt/",
      "**/.astro/",
      "**/build/",
      "**/dist/",
      "**/out/",
      "**/public/",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/vite.config.ts",
      "**/next.config.js",
      "**/tsconfig.json",
      "src/env.d.ts",
      "**/*.cjs",
      "**/*.mjs",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  ...tailwind.configs["flat/recommended"],
  ...pluginQuery.configs["flat/recommended"],
  {
    rules: {
      "object-shorthand": "error",
      "react/display-name": "off",
      "react/jsx-curly-brace-presence": "error",
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: false,
        },
      ],
      "@next/next/no-img-element": "off",
      "tailwindcss/no-custom-classname": "off",
    },
  },
];
