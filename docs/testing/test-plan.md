# テスト計画書

本プロジェクトのテストを、どのツールで、どこまで書くかを定めます。親 Issue は #78、この計画書を作る Issue は #79 です。単体テスト（#80）・結合テスト（#81）・E2E テスト（#82）は、この計画書に従って作ります。

結論は次のとおりです。

- 単体テストと結合テストは Vitest で書き、`pnpm test` の 1 つのコマンドで実行します。コンポーネントの描画には React Testing Library を、PokeAPI への HTTP リクエストの差し替えには MSW を使います
- E2E テストは Playwright（Chromium のみ）で書き、`pnpm test:e2e` で実行します。ブラウザから PokeAPI へのリクエストは、Playwright の `page.route` で差し替えます
- どのテストも、実際の PokeAPI にはアクセスしません。単体・結合・E2E は、同じフィクスチャ（テスト用の固定のレスポンス）を使います
- テスティングトロフィーに沿って、結合テストを最も厚くします。E2E テストは主要な操作の流れだけに絞ります

ツールのバージョンと対応状況は、2026-11-19 に npm のレジストリで確認した内容です。

## 1. 目的と前提

本プロジェクトには、テストのランナーもテストのスクリプトもありません。変更の正しさを確かめる手段は、`pnpm lint`・`pnpm exec tsc --noEmit`・`pnpm build` と、ブラウザでの目視に限られています。AI エージェントが変更したときに、既存の振る舞いを壊していないかをエージェント自身がコマンドで確かめられないと、確認を人が肩代わりすることになります。

この計画書は、AI エージェントが変更を自分で検証できることを、ツールと方針を選ぶ基準にします。具体的には、次の 4 点で評価します（[8 章](#8-ai-駆動開発の観点での評価と要件)）。

- 1 つのコマンドで、短い時間で実行でき、結果を終了コードで判定できる
- 外部の PokeAPI に依存せず、同じ入力で同じ結果になる
- 失敗したときの出力から、原因の箇所と、期待した値と実際の値の差がわかる
- テストの書き方の規約が明確で、既存のテストを手本にして書き足せる

テストの配分は、テスティングトロフィーを前提にします。テスティングトロフィーは、テストを静的解析・単体テスト・結合テスト・E2E テストの 4 層に分け、利用者の使い方に近く、かつ実行の速い結合テストを最も厚くする考え方です（#79 の「決定」）。

対象のアプリケーションの前提は次のとおりです。

- Next.js 16.4.6 の Pages Router、React 18、TypeScript 5.5、Node.js 24、pnpm 11
- データの取得は、すべてブラウザ側で行います。`getServerSideProps` などのサーバー側の取得はありません。TanStack Query のフックが、`pages/api/pokeApi.ts` の axios のインスタンスを通して PokeAPI（`https://pokeapi.co/api/v2`）を呼びます
- 一覧の表示件数とページ番号は Zustand のストアで管理し、`sessionStorage` に保存します。ページ番号は URL の `page` クエリとも同期します

## 2. 現状分析

### モジュールごとのテストのしやすさとリスク

ソースのモジュールを、外部への依存と、テストのしやすさ・リスクで整理しました。「担当の層」は [4 章](#4-テストの種類ごとの定義と対象) の定義に従います。

| モジュール | 主な外部依存 | テストのしやすさ | リスク | 担当の層 |
| --- | --- | --- | --- | --- |
| `utils/pokemon.ts` の `getJaNameBySpecies`・`getJaGenusBySpecies` | なし | 高い。純粋な関数 | 中。言語コードの大文字小文字の違い（`ja-Hrkt`）で名前が空になる不具合が過去にあった | 単体 |
| `utils/pokemon.ts` の取得関数（`getPokemonList`・`getPokemonByPokemonId`・`getSpeciesByPokemonId`・`getTypeDetailByTypeName`・`getAbilityJaName`） | PokeAPI（axios） | 中。HTTP の差し替えが要る | 高い。URL から ID を取り出す処理や、エラーのときに `null`・`undefined` を返すか例外を投げるかが関数ごとに違う | 単体（MSW） |
| `utils/weaknesses.ts` の `getWeaknesses` | PokeAPI（`/type/{name}`） | 中。HTTP の差し替えが要る | 高い。2 タイプの倍率の掛け合わせ（4 倍・0.25 倍・0 倍）を誤ると、詳細ページの弱点の表示が誤る | 単体（MSW） |
| `utils/translator.ts` | なし | 高い。対応表だけ | 低い | 単体 |
| `components/feature/pokemon-detail/capture-rate/utils/` | なし | 高い。純粋な関数 | 中。捕獲率の計算式と、色の境界値（0.1・0.2） | 単体 |
| `lib/utils.ts`（`cn`・`sleep`・`isValidLimit`） | なし | 高い | 低い | 単体 |
| `store/pokemonListStore.ts` | `sessionStorage`（`persist`） | 中。モジュール単位の 1 つのインスタンスで、テストの間で状態が残る | 中。保存する項目を `currentPage` と `limit` に絞る `partialize` の指定が変わると、関数まで保存しようとして、リロード後に操作できなくなる | 単体 |
| `store/pokemonDetailStore.ts` | なし | 中。テストの間で状態が残る | 低い | 単体 |
| `hooks/useGetPokemonList.tsx` | TanStack Query、`next/router`、ストア | 低い。ルーター・ストア・HTTP をそろえる必要がある | 高い。URL の `page` とストアの同期、`offset` の計算 | 結合 |
| `hooks/useGetPokemonDetail.tsx` | TanStack Query、ストア、PokeAPI（4 種類のエンドポイント） | 低い | 高い。1 か所の取得の失敗で、詳細ページ全体がエラーになる | 結合 |
| `hooks/useGetPokemonNames.tsx` | TanStack Query、PokeAPI | 中 | 中。カードの名前の表示 | 結合 |
| `components/feature/pokemon-index/`（`Card`・`PokemonList`） | `useGetPokemonNames`、`next/image`、`next/link` | 中 | 中。取得に失敗したカードは何も表示しない | 結合 |
| `components/feature/pokemon-detail/` | 詳細のストア、`next/image`、`next/link` | 中。ストアに値を入れれば描画できる | 中。各セクションの表示 | 結合 |
| `components/layout/`（`Controller`・`PageNavigation`・`SelectLimit`・`BackToList`・`ToggleTheme`・`Layout`） | ストア、`useGetPokemonList`、Radix UI、`next-themes`、`next/font/google` | 低い。Radix UI の `Select` は jsdom で動かすための補助が要る | 高い。ページ送りと表示件数の切り替え | 結合・E2E |
| `components/ui/`（shadcn/ui から生成） | Radix UI | — | 低い。生成したコードで、利用側のテストで間接的に確かめる | 対象外 |
| `pages/index.tsx`・`pages/pokemon/[id].tsx` | 上記のすべて | 低い | 高い。利用者が直接触る画面 | 結合・E2E |
| `pages/_app.tsx`・`pages/_document.tsx` | QueryClient、`next-themes` | — | 中。テーマの切り替えは E2E で確かめる | E2E |
| `consts/`・`types/` | なし | — | 型と定数だけ。静的解析で確かめる | 静的解析 |

### テストを書くうえで注意が要る点

コードを読んで見つけた、テストの書き方に関わる点です。プロダクションコードは変更しない前提で、テスト側で扱います。

- ストアはモジュールを読み込んだときに 1 つだけ作られます。`pokemonListStore` は `sessionStorage` にも保存するため、テストの前にストアの状態と `sessionStorage` の両方を初期化しないと、前のテストの状態が残ります
- TanStack Query は、既定では失敗したクエリを 3 回まで再試行します。テストごとに `retry: false` の `QueryClient` を作らないと、エラーのテストが遅くなります
- 一覧ページは、一覧の取得に失敗してもエラーを表示しません（`data` が空のまま、カードが並ばないだけです）。詳細ページは、取得に失敗すると `Error occurred` と表示します。結合テストは、この現在の振る舞いを固定します
- `getAbilityJaName` は、レスポンスに含まれる特性の絶対 URL（`https://pokeapi.co/api/v2/ability/{id}/`）をそのまま呼びます。モックは、ベースの URL からの相対パスだけでなく、この形の URL にも応える必要があります
- `components/layout/Layout.tsx` は `next/font/google` を使います。Vitest では動かないため、結合テストではモックに置き換えます。`next build` は Google Fonts からフォントを取得するため、E2E テストのビルドにはネットワークが要ります
- `pages/` の下に置いたファイルは、Pages Router がすべてページとして扱います。テストファイルを `pages/` の下に置くことはできません

## 3. テストの配分：結合テストを最も厚くする

テスティングトロフィーの 4 層に、次の役割を割り当てます。下の層ほど速く、上の層ほど利用者の使い方に近くなります。

| 層 | 任せること | 量の目安 | 実行するコマンド |
| --- | --- | --- | --- |
| 静的解析 | 型の誤り、フックの使い方、未使用の import、整形 | すべてのファイル | `pnpm lint`・`pnpm exec tsc --noEmit`・`pnpm check` |
| 単体テスト | 純粋な関数とストアの入出力。HTTP は MSW で差し替える | 10 ファイル前後 | `pnpm test:unit` |
| 結合テスト | ページとコンポーネントを描画し、フック・ストア・TanStack Query・ルーターを組み合わせた表示と操作。HTTP は MSW で差し替える | 最も多くする | `pnpm test:integration` |
| E2E テスト | 実際のブラウザでしか確かめられない、主要な操作の流れ | 4〜6 件 | `pnpm test:e2e` |

結合テストを最も厚くするのは、本プロジェクトの不具合が起きやすい箇所が、URL・ストア・データの取得・表示の組み合わせにあるためです。たとえば、ページ送りの不具合は、`useGetPokemonList` 単体や `PageNavigation` 単体のテストでは見つかりません。一方で、本プロジェクトの関数の多くは小さく、単体テストで網羅しても、画面の不具合はほとんど防げません。

### 既存の静的解析の位置づけ

静的解析の層は、すでにある 3 つのツールで構成し、新しいツールは加えません。

- TypeScript（`pnpm exec tsc --noEmit`）：型の誤りを見つけます。`tsconfig.json` の `include` は `**/*.ts`・`**/*.tsx` のため、追加するテストファイルとフィクスチャも型検査の対象になります。フィクスチャに `types/` の型を付けると、API の型とフィクスチャの食い違いも見つかります
- ESLint（`pnpm lint`）：Next.js の `core-web-vitals`、TanStack Query、Tailwind CSS のルールで、フックの依存配列やクエリキーの誤りを見つけます
- Biome（`pnpm check`）：整形と、未使用の import・変数などの lint を行います。コミットの前に lint-staged が ESLint と Biome を実行します

AI エージェントは、テストの前に、この 3 つがエラーなく終わることを確かめます（[8 章](#8-ai-駆動開発の観点での評価と要件)）。型の誤りはテストより速く、原因の箇所を直接示すためです。

## 4. テストの種類ごとの定義と対象

### 単体テスト

1 つのモジュール（関数またはストア）を、React を描画せずに検証するテストです。

- 対象：[2 章](#2-現状分析) の表で「単体」としたモジュール
- 差し替えるもの：PokeAPI への HTTP リクエスト（MSW）
- 差し替えないもの：対象のモジュールが import する、ほかのプロジェクト内のモジュール。たとえば `getWeaknesses` のテストでは、`getTypeDetailByTypeName` を差し替えず、HTTP の層だけを差し替えます
- 実行環境：jsdom。ストアが `sessionStorage` を使うため、単体テストも jsdom で実行します

### 結合テスト

ページまたはコンポーネントを React Testing Library で描画し、利用者の操作（クリック、選択）と画面の表示で検証するテストです。

- 対象：[2 章](#2-現状分析) の表で「結合」としたモジュール。ページ（`pages/index.tsx`・`pages/pokemon/[id].tsx`）を描画するテストを中心にします
- 差し替えるもの：PokeAPI への HTTP リクエスト（MSW）、`next/router`（`next-router-mock`）、`next/font/google`（`vi.mock`）
- 差し替えないもの：フック、ストア、TanStack Query、`components/` のコンポーネント
- 実行環境：jsdom

単体テストとの境界は、React を描画するかどうかです。フックも、フックだけを `renderHook` で呼ぶのではなく、フックを使うコンポーネントやページを描画して検証します。フックの戻り値はプロダクションコードの実装の詳細で、利用者が見るのは画面だからです。

### E2E テスト

`next build` でビルドしたアプリケーションを `next start` で起動し、Playwright で実際のブラウザ（Chromium）を操作して検証するテストです。

- 対象：ルーティング、URL のクエリ、テーマの切り替え（`html` 要素の `class`）、ページをまたぐ状態の引き継ぎのように、実際のブラウザで動かしてはじめて確かめられる振る舞い
- 差し替えるもの：ブラウザから PokeAPI へのリクエストと、画像のリクエスト（`page.route`）
- 差し替えないもの：アプリケーションのコードのすべて

結合テストとの境界は、実際のブラウザと Next.js のサーバーが要るかどうかです。表示の細かい分岐（取得に失敗したときの表示など）は、結合テストで確かめ、E2E テストでは扱いません。

## 5. 採用するツールと選んだ理由

### 一覧

| 用途 | 採用するもの | バージョンの目安 | 主な候補 |
| --- | --- | --- | --- |
| テストのランナー | Vitest | `vitest@^5`（5.1.1）、`vite@^8` | Jest（`next/jest`） |
| JSX の変換と `@/` のパスの解決 | `@vitejs/plugin-react`・`vite-tsconfig-paths` | 6.3.0・6.1.1 | — |
| DOM の環境 | jsdom | 31.0.1 | happy-dom |
| コンポーネントの描画と操作 | React Testing Library・user-event・jest-dom | `@testing-library/react` 16.3.3、`@testing-library/dom` 10、`@testing-library/user-event` 14.6.12、`@testing-library/jest-dom` 7.0.1 | Enzyme |
| HTTP の差し替え | MSW | `msw@^2`（2.15.0） | `vi.mock` で `pages/api/pokeApi.ts` を差し替える、axios-mock-adapter |
| `next/router` の差し替え | next-router-mock | 1.0.5 | `vi.mock("next/router")` に自作のモックを書く |
| E2E テスト | Playwright | `@playwright/test` 1.65.1 | Cypress |

### Vitest を選んだ理由

Next.js 16 の公式ガイド（`node_modules/next/dist/docs/02-pages/02-guides/testing/`）は、単体テストのツールとして Vitest と Jest の両方を案内しています。Vitest を選んだのは、次の 3 点からです。

- ES Modules だけを配布するパッケージを、設定を追加せずに読み込めます。Jest では `transformIgnorePatterns` で変換の対象に加える必要があります
- `vitest run` が速く起動し、`--project` で単体と結合を分けて実行できます。エージェントは変更に応じて、速いほうだけを先に実行できます
- 失敗したときに、期待した値と実際の値の差分と、テストファイルの行を出力します

Vitest 5 は `vite` を必須の peer 依存としているため、`vite@^8` も devDependencies に加えます。

### jsdom を選んだ理由

Next.js の公式ガイドが jsdom を使っていて、Radix UI（`Select`・`DropdownMenu`）を動かすときの情報も jsdom のほうが多いためです。happy-dom は速いものの、本プロジェクトの規模では速さの差が小さく、DOM の API の欠けで原因のわかりにくい失敗が起きるほうを避けます。jsdom 31 は Node.js 24.15 以上を求めます。本プロジェクトの Node.js 24.22.3 は条件を満たします。

### MSW を選んだ理由

MSW は、axios より下の HTTP の層でリクエストを差し替えます。

- プロダクションコードの書き方（axios を使うこと、`pokeApi` のインスタンスの場所）に依存しないため、リファクタリング（#58・#59 など）でテストを書き直さずに済みます。`vi.mock` で `pages/api/pokeApi.ts` を差し替える方法は、モジュールのパスと関数の形に依存します
- `onUnhandledRequest: "error"` を設定すると、差し替えていないリクエストをテストの失敗にできます。テストの実行中に外部へアクセスしないことを、仕組みで保証できます
- リクエストに応える処理を、E2E テストの `page.route` と共有できます（[6 章](#6-pokeapi-のモックの方針)）

MSW の最新は 3 系ですが、3 系は TypeScript 5.9 以上を求めます。本プロジェクトは TypeScript 5.5.4 で、テストの Sub-issue では TypeScript を更新しないため、2 系を使います。TypeScript を 5.9 以上に更新したあとで、3 系への更新を検討します。

### next-router-mock を選んだ理由

`useGetPokemonList` は `router.query.page` を読み、`router.push("/?page=2", undefined, { shallow: true })` で URL を変えます。next-router-mock は、Pages Router の `useRouter` を、メモリ上で動くルーターに置き換えます。`push` で `query` と `asPath` が変わり、`MemoryRouterProvider` で包むと `next/link` のクリックでも URL が変わります。`vi.mock("next/router")` に自作のモックを書く方法では、この振る舞いをテストごとに作り直すことになり、Next.js の実際の振る舞いとずれやすくなります。

### Playwright を選んだ理由

- 設定の `webServer` で、テストの前に Next.js のサーバーを起動し、起動を待てます。Next.js の公式ガイドも、この方法を案内しています
- `page.route` で、ブラウザからのリクエストを URL のパターンごとに差し替えられます。本プロジェクトのデータの取得はすべてブラウザ側で行うため、PokeAPI のリクエストはすべて差し替えられます
- `list` レポーターは、テストごとの結果と失敗の箇所を、ターミナルに文字で出力します。失敗したときのトレース（操作ごとの DOM・ネットワーク・コンソールの記録）を、ファイルとして残せます

Cypress は、ブラウザの画面でテストを操作する使い方が中心で、ターミナルだけで原因を調べるエージェントには、Playwright の出力のほうが扱いやすいと判断しました。ブラウザは Chromium だけにします。複数のブラウザでの網羅は、#82 の「やらないこと」です。

## 6. PokeAPI のモックの方針

### 応答を決める処理を 1 か所にまとめる

PokeAPI のリクエストに何を返すかを決める処理を、`tests/mocks/pokeapi/` に 1 つだけ置き、単体・結合・E2E で共有します。

- `resolvePokeApi(url: URL)` は、URL のパスを見て、返すステータスとボディを決める関数です。HTTP のライブラリに依存しない、純粋な関数にします
- 単体・結合テストでは、MSW のハンドラー（`http.get("https://pokeapi.co/api/v2/*", …)`）から `resolvePokeApi` を呼びます
- E2E テストでは、`page.route("https://pokeapi.co/api/v2/**", …)` から `resolvePokeApi` を呼びます

同じ処理を使うので、結合テストと E2E テストで、同じ ID のポケモンが同じ名前で表示されます。

### フィクスチャ

フィクスチャは `tests/fixtures/pokeapi/` に置き、次の 2 種類を使います。

- 実際のレスポンスから作るフィクスチャ：PokeAPI から一度だけ取得したレスポンスを、本プロジェクトが使う項目に絞って JSON で保存します。弱点の計算の分岐を確かめられるよう、次のポケモンと、そのタイプ・特性のレスポンスを用意します
  - 1 フシギダネ（くさ・どく）
  - 6 リザードン（ほのお・ひこう。いわが 4 倍になる）
  - 92 ゴース（ゴースト・どく。ノーマルとかくとうが 0 倍になる）
- 番号から組み立てるフィクスチャ：一覧のページ送りでは、30〜100 件のポケモンが要ります。実際のレスポンスを 100 件保存する代わりに、ID から最小限の `Pokemon` と `Species` を組み立てる関数（`buildPokemon(id)`・`buildSpecies(id)`）を用意します。日本語の名前は `テストポケモン{id}` のように、ID から決まる値にします。一覧のエンドポイント（`/pokemon?limit=&offset=`）は、`limit` と `offset` から結果を組み立てます

どちらのフィクスチャにも `types/` の型を付け、`tsc --noEmit` で API の型との食い違いを見つけます。取得した日付と元の URL は、`tests/fixtures/pokeapi/README.md` に書きます。

### 差し替えていないリクエストを失敗にする

- 単体・結合テスト：MSW の `setupServer` を `onUnhandledRequest: "error"` で起動します。`resolvePokeApi` が応えられないリクエストは、テストの失敗になります
- E2E テスト：`localhost` 以外へのリクエストのうち、差し替えていないものはすべて `route.abort()` で止め、URL をテストの出力に記録します

### エラーのときの応答

エラーの表示を確かめるテストでは、そのテストの中だけで応答を上書きします。結合テストでは `server.use(http.get(…, () => new HttpResponse(null, { status: 500 })))` を使い、テストの後に `server.resetHandlers()` で元に戻します。E2E テストでは、エラーの表示は扱いません（[4 章](#4-テストの種類ごとの定義と対象)）。

### 画像とフォント

- 画像：一覧と詳細の画像は `next/image` で表示され、ブラウザは `/_next/image?url=…` に画像を求めます。このとき Next.js のサーバーが `raw.githubusercontent.com` などから元の画像を取得するため、`page.route` で PokeAPI を差し替えても、サーバー側の外部へのアクセスが残ります。E2E テストでは `**/_next/image**` へのリクエストを `page.route` で受け、`tests/fixtures/` に置いた小さな PNG を返します。結合テスト（jsdom）では画像を読み込まないため、扱いは要りません
- フォント：`next/font/google` は、`next build` のときに Google Fonts からフォントを取得します。E2E テストのビルドにはネットワークが要ることを、前提として認めます。テストの実行中（ブラウザの操作中）には、外部へアクセスしません

### 実際の PokeAPI とのずれ

フィクスチャは、取得した時点の PokeAPI のレスポンスを固定したものです。PokeAPI のレスポンスの形が変わっても、テストは成功し続けます。実際の API とのずれを確かめる仕組み（契約テスト）は、この計画では作りません（[9 章](#9-今後の課題)）。

## 7. 優先度と各 Sub-issue で書くテストの範囲

Sub-issue は、#80 → #81 → #82 の順に進めます。#80 でランナーと MSW を導入し、#81 はそれを使います。#82 は #80・#81 と独立していますが、`package.json` と `pnpm-lock.yaml` を変更するため、1 件ずつマージします。

### ファイルの配置

テストのファイルは、対象のモジュールの横ではなく、次のディレクトリにまとめます。`pages/` の下にはテストファイルを置けないため（[2 章](#テストを書くうえで注意が要る点)）、例外を作らずに済む配置にしました。

```text
tests/
  unit/            単体テスト。対象のパスをそのまま写す（例：tests/unit/utils/weaknesses.test.ts）
  integration/     結合テスト。対象のパスをそのまま写す（例：tests/integration/pages/index.test.tsx）
  fixtures/
    pokeapi/       PokeAPI のフィクスチャ（JSON と組み立て関数）と README.md
  mocks/
    pokeapi/       resolvePokeApi と MSW のハンドラー
  setup/           Vitest の setupFiles（MSW の起動、ストアと sessionStorage の初期化など）
e2e/               E2E テスト（例：e2e/pokemon-list.spec.ts）
vitest.config.mts  単体と結合の 2 つの project を定義する
playwright.config.ts
```

### #80 単体テスト

優先度は最も高くします。速く、外部に依存せず、エージェントが変更のたびに実行するテストだからです。

| 対象 | テストファイル | 主に確かめること |
| --- | --- | --- |
| `utils/pokemon.ts` | `tests/unit/utils/pokemon.test.ts` | 日本語名と分類を、言語コードの大文字小文字によらず取り出すこと。日本語がないと空文字を返すこと。一覧の URL から ID を取り出すこと。取得に失敗したときに `null`・`undefined` を返すか、例外を投げるかが関数ごとに現在のとおりであること |
| `utils/weaknesses.ts` | `tests/unit/utils/weaknesses.test.ts` | 1 タイプ・2 タイプでの倍率（4 倍・2 倍・0.5 倍・0.25 倍・0 倍）。タイプの取得に失敗したときに例外を投げること |
| `utils/translator.ts` | `tests/unit/utils/translator.test.ts` | 18 のタイプすべてに日本語名があること |
| `components/feature/pokemon-detail/capture-rate/utils/` | `tests/unit/components/feature/pokemon-detail/capture-rate/utils.test.ts` | 捕獲率の計算結果と、色の境界値（0.1・0.2） |
| `lib/utils.ts` | `tests/unit/lib/utils.test.ts` | `cn` が Tailwind CSS のクラスの衝突を解決すること。`isValidLimit` が 30・50・100 だけを受け付けること。`sleep` が指定した時間の後に解決すること（偽のタイマーを使う） |
| `store/pokemonListStore.ts` | `tests/unit/store/pokemonListStore.test.ts` | 初期値、`setCurrentPage`・`setLimit`、`sessionStorage` に `currentPage` と `limit` だけを保存すること |
| `store/pokemonDetailStore.ts` | `tests/unit/store/pokemonDetailStore.test.ts` | 初期値と `setPokemonData` |

#80 で導入するもの：`vitest`・`vite`・`@vitejs/plugin-react`・`vite-tsconfig-paths`・`jsdom`・`msw@^2`。#80 で作るもの：`vitest.config.mts`（`unit` の project）、`tests/setup/`、`tests/mocks/pokeapi/`、`tests/fixtures/pokeapi/`（単体テストで使う分）。`package.json` に `test`・`test:unit` のスクリプトを加えます。

### #81 結合テスト

優先度は #80 の次です。テスティングトロフィーで最も厚くする層で、テストの件数も最も多くなります。

| 対象 | テストファイル | 主に確かめること |
| --- | --- | --- |
| 一覧ページ | `tests/integration/pages/index.test.tsx` | モックの一覧のポケモンの日本語名がカードに表示されること。「次の 30 件」を押すと `offset=30` で取得し、URL が `/?page=2` になること。URL が `/?page=3` のときに `offset=60` で取得すること。表示件数で 50 件を選ぶと `limit=50` で取得すること。一覧の取得に失敗したときに、カードを表示せず、例外で画面が壊れないこと |
| 一覧のカード | `tests/integration/components/feature/pokemon-index/Card.test.tsx` | 図鑑番号（`#0006`）・タイプの日本語名・詳細へのリンク。種族の取得に失敗したカードを表示しないこと |
| 詳細ページ | `tests/integration/pages/pokemon/[id].test.tsx` | モックの名前・タイプ・図鑑番号が表示されること。弱点の表に、リザードンのいわが 4 倍で表示されること。取得に失敗したときに `Error occurred` と表示すること |
| 一覧へ戻るボタン | `tests/integration/components/layout/BackToList.test.tsx` | ストアのページ番号が、リンクの `href`（`/?page={n}`）になること |

取得した範囲（`offset`・`limit`）は、MSW が受けたリクエストの URL を記録して確かめます。#81 で導入するもの：`@testing-library/react`・`@testing-library/dom`・`@testing-library/user-event`・`@testing-library/jest-dom`・`next-router-mock`。`vitest.config.mts` に `integration` の project を加え、`test:integration` のスクリプトを加えます。

`components/ui/` 単体のテストは書きません（#81 の「やらないこと」）。

### #82 E2E テスト

優先度は最も低くします。実行に時間がかかり、確かめる範囲の多くは結合テストと重なるためです。ただし、ルーティングとテーマの切り替えは、E2E テストでしか確かめられません。

| テストファイル | 確かめること |
| --- | --- |
| `e2e/pokemon-list.spec.ts` | `/` を開くとカードが表示され、カードを押すと `/pokemon/{id}` に移って詳細が表示されること。ページを送ると、URL の `page` クエリと表示されるポケモンが変わること |
| `e2e/pokemon-detail.spec.ts` | 詳細ページの「一覧へ戻る」で、元のページ番号の一覧に戻ること |
| `e2e/theme.spec.ts` | テーマを Dark・Light に切り替えると、`html` 要素の `class` が切り替わること |

#82 で導入するもの：`@playwright/test`。ブラウザは `pnpm exec playwright install chromium` で取得します。`playwright.config.ts` の設定は次のとおりです。

- `webServer`：`pnpm build && pnpm start --port 3100` を実行し、`http://localhost:3100` を待ちます。開発サーバーの 3000 番と重ならないポートにします。環境変数 `NEXT_TELEMETRY_DISABLED=1` を渡し、Next.js のテレメトリーの送信を止めます。ローカルでは、起動済みのサーバーを使い回します（`reuseExistingServer: !process.env.CI`）
- `projects`：Chromium だけ
- `retries`：0。不安定なテストを、再試行で隠さないためです
- `reporter`：`list`。HTML のレポートは作るものの自動では開かない設定（`open: "never"`）にし、コマンドが終わらなくなるのを防ぎます
- `trace`：`retain-on-failure`。失敗したテストだけ、トレースを `test-results/` に残します

`test-results/` と `playwright-report/` は `.gitignore` に加えます。`package.json` に `test:e2e` のスクリプトを加えます。

## 8. AI 駆動開発の観点での評価と要件

### 評価

| 観点 | 単体・結合（Vitest） | E2E（Playwright） |
| --- | --- | --- |
| 1 つのコマンド・短い時間・機械的な判定 | `pnpm test` の 1 つで、単体と結合をまとめて実行します。`vitest run` は監視を続けずに終了し、成否を終了コードで返します | `pnpm test:e2e` の 1 つで、ビルド・起動・テストを行います。ビルドを含むため、単体・結合より遅くなります |
| PokeAPI に依存しない再現性 | MSW が差し替えていないリクエストを失敗にします | `page.route` で PokeAPI と画像を差し替え、それ以外の外部へのリクエストを止めます。ビルドのときのフォントの取得だけが、外部に依存します |
| 失敗したときの出力 | テストの名前、ファイルと行、期待した値と実際の値の差分を出力します | テストの名前と、失敗した操作・アサーションの行を出力します。トレースのファイルに、失敗までの DOM とネットワークの記録が残ります |
| 手本にできる規約 | 配置と書き方を下の規約に定めます | 同じ |

### 実行するコマンド

| コマンド | 内容 | 実行時間の目安 | いつ実行するか |
| --- | --- | --- | --- |
| `pnpm lint`・`pnpm exec tsc --noEmit` | 静的解析 | 30 秒以内 | すべての変更のあと |
| `pnpm test:unit` | 単体テスト（`vitest run --project unit`） | 10 秒以内 | `utils/`・`lib/`・`store/` を変えたとき |
| `pnpm test:integration` | 結合テスト（`vitest run --project integration`） | 60 秒以内 | `components/`・`hooks/`・`pages/` を変えたとき |
| `pnpm test` | 単体と結合（`vitest run`） | 60 秒以内 | すべての変更のあと |
| `pnpm test:e2e` | E2E テスト（`playwright test`） | ビルドを含めて 3 分以内 | `pages/`・ルーティング・テーマ・レイアウトを変えたとき、PR を作る前 |

実行時間は、各 Sub-issue で実際に測り、目安を大きく超える場合は PR に書きます。どのスクリプトも、監視を続けるモード（watch）では実行しません。エージェントがコマンドの終了を待てなくなるためです。人が監視しながら書くときは、`pnpm exec vitest` を直接使います。

各 Sub-issue では、`AGENTS.md` に、変更を検証するための手順として、静的解析 → `pnpm test` →（必要なら）`pnpm test:e2e` の順と、上の表のコマンドを書きます。

### 出力の要件

- 成否は終了コードで判定できること。成功は 0、失敗は 0 以外
- 失敗したテストについて、テストの名前、テストファイルの行、期待した値と実際の値が出力されること
- 成功したときの出力は短くすること。Vitest の既定のレポーターと Playwright の `list` レポーターは、この条件を満たします
- テストの実行中に警告（React の `act` の警告、MSW の未処理のリクエストなど）が出たら、放置せずに直すこと。警告が残っていると、エージェントは新しい警告に気づけません

### テストの書き方の規約

- テストの関数（`describe`・`it`・`expect`・`vi`）は `vitest` から明示的に import します。グローバルには登録しません。`tsconfig.json` を変えずに型が付き、どこから来た関数かがファイルの中でわかるためです
- `describe` には対象の名前を、`it` には振る舞いを日本語の文で書きます（例：`it("ほのおとひこうのタイプでは、いわの倍率が 4 になる")`）。失敗したときに、テストの名前だけで何が壊れたかがわかるようにするためです
- 1 つのテストでは、準備・実行・確認の順に書き、確認する振る舞いは 1 つにします
- 要素は、`getByRole`・`getByText` のように、利用者に見える情報で探します。`data-testid` は、ほかに手段がない場合だけ使います。プロダクションコードに `data-testid` を加えることはしません
- スナップショットテストは使いません。差分が大きくなりやすく、意図した変更か不具合かをエージェントが判定しにくいためです
- 待つときは、`findBy…` や Playwright の自動の待機を使い、決まった時間だけ待つ処理（`sleep`・`waitForTimeout`）は使いません
- テストの前に、ストアの状態（`getInitialState()` で得た初期値で上書きする）と `sessionStorage` を初期化し、MSW のハンドラーを元に戻します。この処理は `tests/setup/` に置き、個々のテストには書きません
- 結合テストでは、テストごとに `retry: false` の `QueryClient` を作ります。ページを描画するための関数（`QueryClientProvider` と `MemoryRouterProvider` で包む）を `tests/` に 1 つ用意し、すべての結合テストで使います
- PokeAPI のデータは、テストファイルに直接書かず、`tests/fixtures/pokeapi/` のフィクスチャを使います

## 9. 今後の課題

次の点は、この計画とテストの Sub-issue では扱いません。必要になったら、別の Issue として起票します。

- CI（GitHub Actions）でのテストの自動実行：#80〜#82 がそろったあと、静的解析と `pnpm test` から始め、E2E テストを加えるかは実行時間を見て決めます
- カバレッジ：閾値による失敗は設定しません。`@vitest/coverage-v8` でカバレッジを測るかは、テストがそろってから決めます
- PokeAPI との契約テスト：フィクスチャと実際のレスポンスの形のずれを、定期的に確かめる仕組み
- TypeScript の 5.9 以上への更新と、MSW 3 系への更新
- `@types/node` の更新：Vitest 5 は任意の peer 依存として `@types/node` の 22 以上を挙げています。本プロジェクトは 20 系のため、インストール時に警告が出る場合があります
- テストを書くためのリファクタリング：テストを書く中で、プロダクションコードを変えないとテストできない箇所が見つかった場合
