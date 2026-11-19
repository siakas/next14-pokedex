import {
  calculateCaptureProb,
  getColorByProbability,
} from "@/components/feature/pokemon-detail/capture-rate/utils";
import { describe, expect, it } from "vitest";

describe("calculateCaptureProb", () => {
  it("HP と捕獲率から、HP が満タンのときの捕獲成功率を計算する", () => {
    // (1 + (1 * 3 - 1 * 2) * 255) / (1 * 3) / 256 = 0.3333...
    expect(calculateCaptureProb(1, 255)).toBe(0.333);
  });

  it("捕獲成功率を小数点第 3 位で丸める", () => {
    // (1 + 78 * 45) / (78 * 3) / 256 = 0.05861...
    expect(calculateCaptureProb(78, 45)).toBe(0.059);
  });
});

describe("getColorByProbability", () => {
  it.each([
    [0, "danger"],
    [0.0999, "danger"],
    [0.1, "warning"],
    [0.1999, "warning"],
    [0.2, "success"],
    [1, "success"],
  ] as const)("捕獲成功率が %s のとき %s を返す", (prob, color) => {
    expect(getColorByProbability(prob)).toBe(color);
  });
});
