import config from "../config";
import { Gameboards, UserLogin, UserRegister } from "../types/interfaces";

interface LoginResponse {
  user: {
    token: string;
  };
}

interface GameboardsResponse {
  gameboards: Gameboards;
}

class FetchApi {
  private baseUrl = config.endpoints.base;
  private headers: Record<string, string> = {};

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

  private postData<T>(pathUrl: string, data: FormData) {
    const postOptions = {
      method: "POST",
      body: data,
    };

    return this.fetchJson<T>(pathUrl, postOptions);
  }

  private get<T>(pathUrl: string) {
    const getOptions = {
      method: "GET",
    };

    return this.fetchJson<T>(pathUrl, getOptions);
  }

  private setHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }

  private setBearerAuth(token: string) {
    this.headers.Authorization = `Bearer ${token}`;
    return this;
  }

  loginUser(user: UserLogin) {
    return this.setHeader(
      "Content-Type",
      "application/json"
    ).post<LoginResponse>(config.endpoints.loginPath, {
      user,
    });
  }

  registerUser(user: UserRegister) {
    return this.setHeader("Content-Type", "application/json").post(
      config.endpoints.registerPath,
      { user }
    );
  }

  getGameboards(token: string) {
    return this.setBearerAuth(token).get<GameboardsResponse>(
      config.endpoints.gameboardsPath
    );
  }

  postGameboard(token: string, data: FormData) {
    return this.setBearerAuth(token).postData(
      config.endpoints.gameboardsPath,
      data
    );
  }
}

export default FetchApi;
