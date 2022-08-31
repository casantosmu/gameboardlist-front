import {
  BASE_ENDPOINT,
  REGISTER_USER_ENDPOINT,
} from "../constants/endpointsConstants";
import { AuthUser } from "../types/interfaces";

class UserApi {
  registerUser(user: AuthUser) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${BASE_ENDPOINT}${REGISTER_USER_ENDPOINT}`,
          postOptions
        );
        const data = await response.json();

        if (!response.ok) throw Error(data.error);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserApi;
