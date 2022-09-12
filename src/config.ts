const config = {
  endpoints: {
    base: process.env.REACT_APP_API_URL,
    loginPath: "/users/login",
    registerPath: "/users/register",
    gameboardsPath: "/gameboards",
  } as const,
  gameboards: {
    categories: ["party", "family", "thematic", "wargame", "strategy"],
  } as const,
} as const;

export default config;
