import config from "../config";
import { Gameboard, Gameboards } from "../types/gameboards";
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

interface FetchApiOptions extends RequestInit {
  parseResponse?: boolean;
}

class FetchApi {
  private baseUrl = config.endpoints.base;
  private headers: Record<string, string> = {};

  private fetchJson<T>(pathUrl: string, options: FetchApiOptions) {
    return new Promise<T | null>(async (resolve, reject) => {
      try {
        const response = await fetch(this.baseUrl + pathUrl, {
          ...options,
          headers: this.headers,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        if (options.parseResponse === false || response.status === 204) {
          resolve(null);
          return;
        }

        resolve(response.json());
      } catch (error) {
        reject(error);
      }
    });
  }

  private post<T>(
    pathUrl: string,
    body: Object,
    options: FetchApiOptions = {}
  ) {
    const postOptions = {
      ...options,
      body: JSON.stringify(body),
      method: "POST",
    };

    return this.setHeader("Content-Type", "application/json").fetchJson<T>(
      pathUrl,
      postOptions
    );
  }

  private postData<T>(
    pathUrl: string,
    data: FormData,
    options: FetchApiOptions = {}
  ) {
    const postOptions = {
      ...options,
      body: data,
      method: "POST",
    };

    return this.fetchJson<T>(pathUrl, postOptions);
  }

  private get<T>(pathUrl: string, options: FetchApiOptions = {}) {
    const getOptions = {
      ...options,
      method: "GET",
    };

    return this.fetchJson<T>(pathUrl, getOptions);
  }

  private delete<T>(pathUrl: string, options: FetchApiOptions = {}) {
    const deleteOptions = {
      parseResponse: false,
      ...options,
      method: "DELETE",
    };

    return this.fetchJson<T>(pathUrl, deleteOptions);
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
    }) as Promise<LoginResponse>;
  }

  registerUser(user: UserRegister) {
    return this.post(config.endpoints.registerPath, { user });
  }

  getGameboards(token: string) {
    return this.setBearerAuth(token).get<GameboardsResponse>(
      config.endpoints.gameboardsPath
    ) as Promise<GameboardsResponse>;
  }

  postGameboard(token: string, data: FormData) {
    return this.setBearerAuth(token).postData<GameboardResponse>(
      config.endpoints.gameboardsPath,
      data
    ) as Promise<GameboardResponse>;
  }

  deleteGameboard(token: string, id: string) {
    return this.setBearerAuth(token).delete<null>(
      `${config.endpoints.gameboardsPath}/${id}`
    );
  }

  getGameboard(token: string, id: string) {
    return this.setBearerAuth(token).get<GameboardResponse>(
      `${config.endpoints.gameboardsPath}/${id}`
    ) as Promise<GameboardResponse>;
  }
}

export default FetchApi;
