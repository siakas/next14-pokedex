import { http, HttpResponse, type JsonBodyType } from "msw";
import { POKEAPI_BASE_URL, resolvePokeApi } from "./resolvePokeApi";

/** PokeAPI へのすべての GET リクエストに、resolvePokeApi の応答を返す */
export const handlers = [
  http.get(`${POKEAPI_BASE_URL}/*`, ({ request }) => {
    const { status, body } = resolvePokeApi(new URL(request.url));
    return status === 200
      ? HttpResponse.json(body as JsonBodyType)
      : new HttpResponse(String(body), { status });
  }),
];
