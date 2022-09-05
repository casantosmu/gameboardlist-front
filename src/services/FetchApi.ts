import config from "../config";
import { UserLogin, UserRegister } from "../types/interfaces";

interface LoginResponse {
  user: {
    token: string;
  };
}

class FetchApi {
  private baseUrl = config.endpoints.base;

  private fetchJson<T>(pathUrl: string, options: RequestInit) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(this.baseUrl + pathUrl, {
          ...options,
        });
        const data = await response.json();

        if (!response.ok) throw new Error(response.statusText);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  private post<T>(pathUrl: string, body: Object) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    return this.fetchJson<T>(pathUrl, postOptions);
  }

  loginUser(user: UserLogin) {
    return this.post<LoginResponse>(config.endpoints.loginPath, { user });
  }

  registerUser(user: UserRegister) {
    return this.post(config.endpoints.registerPath, { user });
  }
}

export default FetchApi;
