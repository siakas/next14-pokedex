import { cn, isValidLimit, sleep } from "@/lib/utils";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("cn", () => {
  it("Tailwind CSS のクラスが衝突すると、後に指定したクラスを残す", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  it("false や undefined のクラスを除く", () => {
    expect(cn("font-bold", false, undefined, "text-sm")).toBe(
      "font-bold text-sm",
    );
  });
});

describe("isValidLimit", () => {
  it.each([30, 50, 100])("%i を表示件数として受け付ける", (value) => {
    expect(isValidLimit(value)).toBe(true);
  });

  it.each([0, 20, 40, 101])("%i を表示件数として受け付けない", (value) => {
    expect(isValidLimit(value)).toBe(false);
  });
});

describe("sleep", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("指定した時間が経つと解決する", async () => {
    vi.useFakeTimers();
    const onResolved = vi.fn();
    sleep(1000).then(onResolved);

    await vi.advanceTimersByTimeAsync(999);
    expect(onResolved).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(onResolved).toHaveBeenCalledTimes(1);
  });
});
