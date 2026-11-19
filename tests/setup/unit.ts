import { usePokemonDetailStore } from "@/store/pokemonDetailStore";
import { usePokemonListStore } from "@/store/pokemonListStore";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import { server } from "../mocks/pokeapi/server";

// 差し替えていないリクエストはテストの失敗にし、外部へアクセスしないことを保証する
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ストアはモジュールごとに 1 つのため、前のテストの状態が残らないよう初期化する
// 初期値で上書きすると persist が sessionStorage に書き込むため、上書きの後で消す
beforeEach(() => {
  usePokemonListStore.setState(usePokemonListStore.getInitialState(), true);
  usePokemonDetailStore.setState(usePokemonDetailStore.getInitialState(), true);
  sessionStorage.clear();
});
