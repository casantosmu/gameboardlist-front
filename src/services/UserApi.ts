import { AuthUser } from "../types/interfaces";

class UserApi {
  url = process.env.REACT_APP_API_URL;

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
        const response = await fetch(`${this.url}/register`, postOptions);
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
