import config from "../config";
import { Gameboard, Gameboards } from "../types/interfaces";
import { UserLogin, UserRegister } from "../types/user";

export interface GameboardResponse {
  gameboard: Gameboard;
}

export interface GameboardsResponse {
  gameboards: Gameboards;
}

export interface LoginResponse {
  user: {
    token: string;
  };
}

class FetchApi {
  private baseUrl = config.endpoints.base;
  private headers: Record<string, string> = {};

  private fetchJson<T>(pathUrl: string, options: RequestInit) {
    return new Promise<T | void>(async (resolve, reject) => {
      try {
        const response = await fetch(this.baseUrl + pathUrl, {
          ...options,
          headers: this.headers,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (response.status === 204) {
          resolve(undefined);
        }

        const data = await response.json();
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

    return this.setHeader("Content-Type", "application/json").fetchJson<T>(
      pathUrl,
      postOptions
    );
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

  private delete(pathUrl: string) {
    const getOptions = {
      parseResponse: false,
      method: "DELETE",
    };

    return this.fetchJson(pathUrl, getOptions);
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
    return this.post<LoginResponse>(config.endpoints.loginPath, {
      user,
    });
  }

  registerUser(user: UserRegister) {
    return this.post(config.endpoints.registerPath, { user });
  }

  getGameboards(token: string) {
    return this.setBearerAuth(token).get<GameboardsResponse>(
      config.endpoints.gameboardsPath
    );
  }

  postGameboard(token: string, data: FormData) {
    return this.setBearerAuth(token).postData<GameboardResponse>(
      config.endpoints.gameboardsPath,
      data
    );
  }

  deleteGameboard(token: string, id: string) {
    return this.setBearerAuth(token).delete(
      `${config.endpoints.gameboardsPath}/${id}`
    );
  }

  getGameboard(token: string, id: string) {
    return this.setBearerAuth(token).get<GameboardResponse>(
      `${config.endpoints.gameboardsPath}/${id}`
    );
  }
}

export default FetchApi;
