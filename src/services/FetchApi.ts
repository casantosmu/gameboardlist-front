import config from "../config";
import { UserLogin, UserRegister } from "../types/interfaces";

interface LoginResponse {
  user: {
    token: string;
  };
}

class FetchApi {
  private baseUrl = config.endpoints.base;
  private headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  private fetchJson<T>(pathUrl: string, options: RequestInit) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(this.baseUrl + pathUrl, {
          ...options,
          headers: this.headers,
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
      body: JSON.stringify(body),
    };

    return this.fetchJson<T>(pathUrl, postOptions);
  }

  private get<T>(pathUrl: string) {
    const getOptions = {
      method: "GET",
    };

    return this.fetchJson<T>(pathUrl, getOptions);
  }

  private setBearerAuth(token: string) {
    this.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  loginUser(user: UserLogin) {
    return this.post<LoginResponse>(config.endpoints.loginPath, { user });
  }

  registerUser(user: UserRegister) {
    return this.post(config.endpoints.registerPath, { user });
  }

  getGameboards<T>(token: string) {
    this.setBearerAuth(token);
    return this.get<T>(config.endpoints.gameboardsPath);
  }
}

export default FetchApi;
