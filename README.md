# Next14 Pokedex

本アプリケーションは [PokeApi](https://pokeapi.co/) から取得したデータをもとにしたポケモン図鑑です。

## プロジェクトの内容

このプロジェクトは、Next.js を使用して構築されたポケモン図鑑アプリケーションです。ユーザーはポケモンの詳細情報を閲覧することができます。

## 主な機能

- ポケモンの一覧表示
- ポケモンの詳細情報表示

## セットアップ

### 前提

- Node.js 24 以上
- pnpm 11（`package.json` の `packageManager` で `pnpm@11.2.2` を指定しています）

### 手順

```bash
pnpm install
pnpm dev
```

開発サーバが起動したら、`http://localhost:3000` を開きます。

pnpm 11 は、許可していない依存パッケージのビルドスクリプトを実行しません。ビルドスクリプトの許可は `pnpm-workspace.yaml` の `allowBuilds` で設定しています。依存パッケージを追加して `ERR_PNPM_IGNORED_BUILDS` が出た場合は、`allowBuilds` にそのパッケージを追加してください。

## 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Tanstack Query（React Query）
- Zustand
- shadcn/ui
