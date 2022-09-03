const config = {
  endpoints: {
    base: process.env.REACT_APP_API_URL,
    loginPath: "/users/login",
    registerPath: "/users/register",
  } as const,
} as const;

export default config;
