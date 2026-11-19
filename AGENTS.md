<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 変更を検証する手順

変更のあとは、次の順に実行し、すべて終了コード 0 で終わることを確かめます。テストの方針と書き方の規約は `docs/testing/test-plan.md` を参照してください。

1. 静的解析：`pnpm lint`・`pnpm exec tsc --noEmit`・`pnpm format:check`
2. テスト：`pnpm test`

| コマンド                                                   | 内容                                      | 実行時間の目安 | いつ実行するか                          |
| ---------------------------------------------------------- | ----------------------------------------- | -------------- | --------------------------------------- |
| `pnpm lint`・`pnpm exec tsc --noEmit`・`pnpm format:check` | 静的解析                                  | 30 秒以内      | すべての変更のあと                      |
| `pnpm test:unit`                                           | 単体テスト（`vitest run --project unit`） | 10 秒以内      | `utils/`・`lib/`・`store/` を変えたとき |
| `pnpm test`                                                | すべての Vitest のテスト（`vitest run`）  | 60 秒以内      | すべての変更のあと                      |

- テストは PokeAPI にアクセスしません。MSW が `tests/mocks/pokeapi/` の `resolvePokeApi` で応答し、差し替えていないリクエストはテストの失敗になります
- テストのファイルは `tests/unit/` の下に、対象のパスを写して置きます（例：`tests/unit/utils/weaknesses.test.ts`）。PokeAPI のデータは `tests/fixtures/pokeapi/` のフィクスチャを使います
- watch のモードでは実行しません。人が監視しながら書くときは、`pnpm exec vitest` を直接使います
