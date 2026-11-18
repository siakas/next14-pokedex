import pluginQuery from "@tanstack/eslint-plugin-query";
import nextVitals from "eslint-config-next/core-web-vitals";
import tailwind from "eslint-plugin-tailwindcss";
import unusedImports from "eslint-plugin-unused-imports";
import prettier from "eslint-config-prettier/flat";

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
  ...nextVitals,
  ...tailwind.configs["flat/recommended"],
  ...pluginQuery.configs["flat/recommended"],
  {
    plugins: {
      "unused-imports": unusedImports,
    },
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
      // 未使用の import を検知し、eslint --fix で削除する
      "unused-imports/no-unused-imports": "error",
    },
  },
  // Prettier と競合する整形系のルールを無効にする（最後に置く）
  prettier,
];
