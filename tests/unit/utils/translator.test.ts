import { typesMapping } from "@/utils/translator";
import { describe, expect, it } from "vitest";

/** PokeAPI のポケモンのタイプ（types/pokemon.ts の PokemonType と同じ 18 種類） */
const POKEMON_TYPES = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
] as const;

describe("typesMapping", () => {
  it.each(POKEMON_TYPES)("%s の日本語名がある", (type) => {
    expect(typesMapping[type]).toEqual(expect.any(String));
    expect(typesMapping[type]).not.toBe("");
  });

  it("ほのおのように、タイプ名を日本語に変換する", () => {
    expect(typesMapping.fire).toBe("ほのお");
  });
});
