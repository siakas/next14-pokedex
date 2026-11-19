# PokeAPI のフィクスチャ

テストで使う、PokeAPI のレスポンスを固定したデータです。方針は `docs/testing/test-plan.md` の 6 章を参照してください。テストは `tests/mocks/pokeapi/` の `resolvePokeApi` を通して、このデータを返します。

## 取得元と取得日

2026-11-19 に、次の URL から一度だけ取得しました。

| ディレクトリ       | 取得元の URL                                                      | 内容                                                                                           |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `pokemon/`         | `https://pokeapi.co/api/v2/pokemon/{1,6,92}`                      | 1 フシギダネ、6 リザードン、92 ゴース                                                          |
| `pokemon-species/` | `https://pokeapi.co/api/v2/pokemon-species/{1,6,92}`              | 上の 3 匹の種族                                                                                |
| `type/`            | `https://pokeapi.co/api/v2/type/{fire,flying,ghost,grass,poison}` | 上の 3 匹のタイプ                                                                              |
| `ability/`         | `https://pokeapi.co/api/v2/ability/{26,34,65,66,94}`              | 上の 3 匹の特性（ふゆう・ようりょくそ・しんりょく・もうか・サンパワー）。ファイル名は特性の ID |

3 匹は、弱点の計算の分岐を確かめるために選んでいます。リザードン（ほのお・ひこう）はいわが 4 倍、フシギダネ（くさ・どく）はくさが 0.25 倍、ゴース（ゴースト・どく）はノーマルとかくとうが 0 倍になります。

## 絞り込みの方針

ファイルを小さくするため、取得したレスポンスを次のように絞っています。`types/` の型が求めるキーは消さず、長い配列だけを減らしています。

- 言語ごとの配列（`names`・`genera`・`flavor_text_entries`・`effect_entries`・`form_descriptions`）は、`ja-hrkt`・`ja`・`en` だけを残す。`flavor_text_entries` は言語ごとに先頭の 1 件だけにする
- `pokemon`：`moves` は先頭の 2 件（それぞれの `version_group_details` は先頭の 1 件）、`game_indices` は先頭の 2 件、`held_items` は空にする。型にない `cries`・`past_stats` は消す
- `pokemon-species`：`pokedex_numbers` は先頭の 2 件にする
- `type`：`moves`・`pokemon` は先頭の 3 件、`game_indices` は先頭の 2 件にする。型にない `sprites` は消す
- `ability`：`pokemon` は先頭の 3 件にする

値は書き換えていません。取得し直す場合は、上の URL から取得し、同じ方針で絞ってください（例：`jq '.moves = .moves[:2]'`）。

## 型の検査と、`types/` との食い違い

`index.ts` で、各 JSON を `types/` の型をもとにした型で検査してから、`Pokemon`・`Species`・`Type`・`Ability` として export しています。`pnpm exec tsc --noEmit` で、キーの欠けや構造の違いを見つけられます。

JSON を import すると、文字列は `string` に広がります。そのため、検査には、文字列リテラルの union を `string` に、tuple を配列に広げた型を使っています。タイプ名などの値の誤りは、この検査では見つかりません。

取得した時点で、実際のレスポンスと `types/` の型が次の点で食い違っていました。アプリの不具合ではなく型の定義の問題のため、検査の型だけを補っています。

| 型        | 項目                                   | `types/` の型                                     | 実際のレスポンス                                                                 |
| --------- | -------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------- |
| `Species` | `egg_groups`                           | 要素が 1 つの tuple                               | 要素が 2 つのことがある（フシギダネ・リザードン）                                |
| `Species` | `evolves_from_species`                 | null を許さない                                   | 進化前がいないと null（フシギダネ・ゴース）                                      |
| `Pokemon` | `past_abilities[].abilities[].ability` | null を許さない                                   | null になる（フシギダネ・リザードン）                                            |
| `Pokemon` | `sprites.versions`                     | `generation-vi` の `omegaruby-alphasapphire` など | キーの名前と構成が違う（`omega-ruby-alpha-sapphire` など）。アプリは使っていない |
