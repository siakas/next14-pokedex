import type { PokemonType } from "@/types";
import { getWeaknesses } from "@/utils/weaknesses";
import { describe, expect, it, vi } from "vitest";
import { pokemonById } from "../../fixtures/pokeapi";

const bulbasaur = pokemonById[1]; // くさ・どく
const charizard = pokemonById[6]; // ほのお・ひこう
const gastly = pokemonById[92]; // ゴースト・どく

describe("getWeaknesses", () => {
  describe("1 タイプのとき", () => {
    // リザードンのタイプのうち、ほのおだけを使う
    const fireOnly = charizard.types.filter(({ type }) => type.name === "fire");

    it("こうかばつぐんのタイプの倍率が 2 になる", async () => {
      const weaknesses = await getWeaknesses(fireOnly);
      expect(weaknesses.water).toBe(2);
    });

    it("いまひとつのタイプの倍率が 0.5 になる", async () => {
      const weaknesses = await getWeaknesses(fireOnly);
      expect(weaknesses.grass).toBe(0.5);
    });

    it("相性のないタイプの倍率が 1 になる", async () => {
      const weaknesses = await getWeaknesses(fireOnly);
      expect(weaknesses.normal).toBe(1);
    });
  });

  describe("2 タイプのとき", () => {
    it("ほのおとひこうのタイプでは、いわの倍率が 4 になる", async () => {
      const weaknesses = await getWeaknesses(charizard.types);
      expect(weaknesses.rock).toBe(4);
    });

    it("ほのおとひこうのタイプでは、みずの倍率が 2 になる", async () => {
      const weaknesses = await getWeaknesses(charizard.types);
      expect(weaknesses.water).toBe(2);
    });

    it("ほのおとひこうのタイプでは、ほのおの倍率が 0.5 になる", async () => {
      const weaknesses = await getWeaknesses(charizard.types);
      expect(weaknesses.fire).toBe(0.5);
    });

    it("ほのおとひこうのタイプでは、じめんの倍率が 0 になる", async () => {
      const weaknesses = await getWeaknesses(charizard.types);
      expect(weaknesses.ground).toBe(0);
    });

    it("くさとどくのタイプでは、くさの倍率が 0.25 になる", async () => {
      const weaknesses = await getWeaknesses(bulbasaur.types);
      expect(weaknesses.grass).toBe(0.25);
    });

    it("ゴーストとどくのタイプでは、ノーマルとかくとうの倍率が 0 になる", async () => {
      const weaknesses = await getWeaknesses(gastly.types);
      expect([weaknesses.normal, weaknesses.fighting]).toEqual([0, 0]);
    });
  });

  it("18 のタイプすべての倍率を返す", async () => {
    const weaknesses = await getWeaknesses(charizard.types);
    expect(Object.keys(weaknesses)).toHaveLength(18);
  });

  it("タイプの取得に失敗すると、エラーを出力して例外を投げる", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    // フィクスチャにないタイプ（みず）は 404 になる
    const water: PokemonType = {
      slot: 1,
      type: { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
    };

    await expect(getWeaknesses([water])).rejects.toThrow();
    expect(consoleError).toHaveBeenCalledOnce();
  });
});
