const config = {
  endpoints: {
    base: process.env.REACT_APP_API_URL,
    loginPath: "/users/login",
    registerPath: "/users/register",
    gameboardsPath: "/gameboards",
  } as const,
} as const;

export default config;
