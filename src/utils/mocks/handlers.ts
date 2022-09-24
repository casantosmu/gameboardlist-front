import { rest } from "msw";
import config from "../../config";
import { fakeGameboards } from "./fakeData";

const baseUrl = config.endpoints.base;

export const handlers = [
  rest.post(
    `${baseUrl}${config.endpoints.loginPath}`,
    async (req, res, ctx) => {
      const request = await req.json();

      return request.user.email === "exists"
        ? res(ctx.status(400), ctx.json(null))
        : res(
            ctx.status(200),
            ctx.json({
              user: {
                token: "token",
              },
            })
          );
    }
  ),

  rest.post(
    `${baseUrl}${config.endpoints.registerPath}`,
    async (_, res, ctx) => {
      return res(ctx.status(201), ctx.json(true));
    }
  ),

  rest.get(
    `${baseUrl}${config.endpoints.gameboardsPath}`,
    async (req, res, ctx) => {
      const authentication = req.headers.get("Authorization")!;
      const token = authentication.split(" ")[1];

      return token !== "valid"
        ? res(ctx.status(401), ctx.json(null))
        : res(ctx.status(200), ctx.json(fakeGameboards));
    }
  ),

  rest.post(
    `${baseUrl}${config.endpoints.gameboardsPath}`,
    async (_, res, ctx) => {
      return res(ctx.status(201), ctx.json(true));
    }
  ),

  rest.delete(
    `${baseUrl}${config.endpoints.gameboardsPath}/id1`,
    async (req, res, ctx) => {
      return res(ctx.status(204));
    }
  ),

  rest.delete(
    `${baseUrl}${config.endpoints.gameboardsPath}/id2`,
    async (req, res, ctx) => {
      return res(ctx.status(204));
    }
  ),
];
