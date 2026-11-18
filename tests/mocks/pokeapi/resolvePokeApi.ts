import type { PokemonList } from "@/types";
import {
  abilities,
  pokemonById,
  speciesById,
  typeByName,
} from "../../fixtures/pokeapi";

/** PokeAPI のベースの URL */
export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

/** 一覧のエンドポイントが返すポケモンの総数 */
export const POKEMON_COUNT = 1025;

/** resolvePokeApi が返す応答 */
export type PokeApiResponse = {
  status: number;
  body: unknown;
};

const NOT_FOUND: PokeApiResponse = { status: 404, body: "Not Found" };

/** フィクスチャがあれば 200、なければ 404 を返す */
const fromRecord = <T>(
  record: Readonly<Record<string, T>>,
  key: string | undefined,
): PokeApiResponse =>
  key !== undefined && Object.hasOwn(record, key)
    ? { status: 200, body: record[key] }
    : NOT_FOUND;

/** 一覧のページの URL を組み立てる。範囲の外であれば null */
const buildListPageUrl = (offset: number, limit: number): string | null =>
  offset < 0 || offset >= POKEMON_COUNT
    ? null
    : `${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`;

/** 一覧のエンドポイントの応答を、limit と offset から組み立てる */
const buildPokemonList = (searchParams: URLSearchParams) => {
  const limit = Number(searchParams.get("limit") ?? 20);
  const offset = Number(searchParams.get("offset") ?? 0);
  const length = Math.max(Math.min(offset + limit, POKEMON_COUNT) - offset, 0);

  return {
    count: POKEMON_COUNT,
    next: buildListPageUrl(offset + limit, limit),
    previous:
      offset === 0
        ? null
        : buildListPageUrl(Math.max(offset - limit, 0), limit),
    // 実際の API と同じく id は含めない（id は getPokemonList が URL から付ける）
    results: Array.from({ length }, (_, i) => ({
      name: `pokemon-${offset + i + 1}`,
      url: `${POKEAPI_BASE_URL}/pokemon/${offset + i + 1}/`,
    })),
  } satisfies Omit<PokemonList, "results"> & {
    results: Omit<PokemonList["results"][number], "id">[];
  };
};

/**
 * PokeAPI へのリクエストの URL から、返すステータスとボディを決める
 *
 * HTTP のライブラリに依存しない純粋な関数で、MSW（単体・結合テスト）と
 * Playwright の page.route（E2E テスト）の両方から呼ぶ。
 * 末尾の "/" の有無によらず応える（特性は絶対 URL の末尾に "/" が付く）。
 */
export const resolvePokeApi = (url: URL): PokeApiResponse => {
  const base = new URL(POKEAPI_BASE_URL);
  if (url.origin !== base.origin) return NOT_FOUND;
  if (!url.pathname.startsWith(`${base.pathname}/`)) return NOT_FOUND;

  const [resource, key, ...rest] = url.pathname
    .slice(base.pathname.length)
    .split("/")
    .filter(Boolean);
  if (rest.length > 0) return NOT_FOUND;

  switch (resource) {
    case "pokemon":
      return key === undefined
        ? { status: 200, body: buildPokemonList(url.searchParams) }
        : fromRecord(pokemonById, key);
    case "pokemon-species":
      return fromRecord(speciesById, key);
    case "type":
      return fromRecord(typeByName, key);
    case "ability": {
      const ability = abilities.find(
        ({ id, name }) => String(id) === key || name === key,
      );
      return ability ? { status: 200, body: ability } : NOT_FOUND;
    }
    default:
      return NOT_FOUND;
  }
};
