import config from "../config";
import { AuthUser } from "../types/interfaces";

type postUserPathsUrl =
  | typeof config.endpoints.loginPath
  | typeof config.endpoints.registerPath;

class UserApi {
  private baseUrl = config.endpoints.base;

  postUser(user: AuthUser, pathUrl: postUserPathsUrl) {
    const postUrl = `${this.baseUrl}${pathUrl}`;
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(postUrl, postOptions);
        const data = await response.json();

        if (!response.ok) {
          throw Error(`${response.status}: ${data.error}`);
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserApi;
