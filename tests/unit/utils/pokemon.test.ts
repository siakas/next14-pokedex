import type { Species } from "@/types";
import {
  getAbilityJaName,
  getJaGenusBySpecies,
  getJaNameBySpecies,
  getPokemonByPokemonId,
  getPokemonList,
  getSpeciesByPokemonId,
  getTypeDetailByTypeName,
} from "@/utils/pokemon";
import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { pokemonById, speciesById, typeByName } from "../../fixtures/pokeapi";
import { POKEAPI_BASE_URL } from "../../mocks/pokeapi/resolvePokeApi";
import { server } from "../../mocks/pokeapi/server";

/** フィクスチャにないポケモンの ID */
const UNKNOWN_POKEMON_ID = 9999;

/** 言語ごとの配列から、指定した言語の要素だけを残す */
const onlyLanguage = <T extends { language: { name: string } }>(
  entries: T[],
  languageName: string,
): T[] => entries.filter((entry) => entry.language.name === languageName);

/** 言語ごとの配列で、言語コードを置き換える */
const renameLanguage = <T extends { language: { name: string; url: string } }>(
  entries: T[],
  from: string,
  to: string,
): T[] =>
  entries.map((entry) =>
    entry.language.name === from
      ? { ...entry, language: { ...entry.language, name: to } }
      : entry,
  );

describe("getJaNameBySpecies", () => {
  const charizard = speciesById[6];

  it("種族の情報から日本語（カナ）の名前を返す", () => {
    expect(getJaNameBySpecies(charizard)).toBe("リザードン");
  });

  it("言語コードが ja-Hrkt のように大文字を含んでも、日本語の名前を返す", () => {
    const species: Species = {
      ...charizard,
      names: renameLanguage(
        onlyLanguage(charizard.names, "ja-hrkt"),
        "ja-hrkt",
        "ja-Hrkt",
      ),
    };

    expect(getJaNameBySpecies(species)).toBe("リザードン");
  });

  it("日本語（カナ）の名前がないと、ja の名前があっても空文字を返す", () => {
    const species: Species = {
      ...charizard,
      names: charizard.names.filter((name) => name.language.name !== "ja-hrkt"),
    };

    expect(getJaNameBySpecies(species)).toBe("");
  });
});

describe("getJaGenusBySpecies", () => {
  const charizard = speciesById[6];

  it("種族の情報から日本語（カナ）の分類を返す", () => {
    expect(getJaGenusBySpecies(charizard)).toBe("かえんポケモン");
  });

  it("言語コードが ja-Hrkt のように大文字を含んでも、日本語の分類を返す", () => {
    const species: Species = {
      ...charizard,
      genera: renameLanguage(
        onlyLanguage(charizard.genera, "ja-hrkt"),
        "ja-hrkt",
        "ja-Hrkt",
      ),
    };

    expect(getJaGenusBySpecies(species)).toBe("かえんポケモン");
  });

  it("日本語（カナ）の分類がないと、空文字を返す", () => {
    const species: Species = {
      ...charizard,
      genera: charizard.genera.filter(
        (genus) => genus.language.name !== "ja-hrkt",
      ),
    };

    expect(getJaGenusBySpecies(species)).toBe("");
  });
});

describe("getPokemonList", () => {
  it("引数を省略すると、先頭から 30 件を取得する", async () => {
    const list = await getPokemonList();

    expect(list.results).toHaveLength(30);
    expect(list.results[0]).toMatchObject({ id: 1, name: "pokemon-1" });
  });

  it("各ポケモンに、URL から取り出した id を付ける", async () => {
    const list = await getPokemonList(30, 50);

    expect(list.results).toHaveLength(50);
    expect(list.results.map(({ id }) => id)).toEqual(
      Array.from({ length: 50 }, (_, i) => 31 + i),
    );
  });

  it("取得に失敗すると、例外を投げる", async () => {
    server.use(
      http.get(
        `${POKEAPI_BASE_URL}/pokemon`,
        () => new HttpResponse(null, { status: 500 }),
      ),
    );

    await expect(getPokemonList()).rejects.toThrow();
  });
});

describe("getPokemonByPokemonId", () => {
  it("ID からポケモンの詳細を返す", async () => {
    await expect(getPokemonByPokemonId(6)).resolves.toEqual(pokemonById[6]);
  });

  it("取得に失敗すると、null を返す", async () => {
    await expect(getPokemonByPokemonId(UNKNOWN_POKEMON_ID)).resolves.toBeNull();
  });
});

describe("getSpeciesByPokemonId", () => {
  it("ID からポケモンの種族を返す", async () => {
    await expect(getSpeciesByPokemonId(6)).resolves.toEqual(speciesById[6]);
  });

  it("取得に失敗すると、null を返す", async () => {
    await expect(getSpeciesByPokemonId(UNKNOWN_POKEMON_ID)).resolves.toBeNull();
  });
});

describe("getTypeDetailByTypeName", () => {
  it("タイプ名からタイプの詳細を返す", async () => {
    await expect(getTypeDetailByTypeName("fire")).resolves.toEqual(
      typeByName.fire,
    );
  });

  it("取得に失敗すると、例外を投げる", async () => {
    await expect(getTypeDetailByTypeName("unknown")).rejects.toThrow();
  });
});

describe("getAbilityJaName", () => {
  it("ポケモンの詳細に含まれる特性の URL から、日本語（カナ）の特性名を返す", async () => {
    const [blaze] = pokemonById[6].abilities;

    await expect(getAbilityJaName(blaze.ability.url)).resolves.toBe("もうか");
  });

  it("取得に失敗すると、エラーを出力して undefined を返す", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      getAbilityJaName(`${POKEAPI_BASE_URL}/ability/9999/`),
    ).resolves.toBeUndefined();
    expect(consoleError).toHaveBeenCalledOnce();
  });
});
