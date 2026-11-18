import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** 単体・結合テストで使う MSW のサーバー */
export const server = setupServer(...handlers);
