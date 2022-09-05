import { rest } from "msw";
import config from "../config";

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
];
