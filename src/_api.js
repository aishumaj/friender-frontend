import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  static token = "";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  // Individual API routes
  
    /** Create a new user */

    static async createNewUser(username, firstName, password, age, zipCode, bio,
      hobbies, interests, radius, image) {
      let res = await this.request("signup",
        { username, firstName, password, age, zipCode, bio,
          hobbies, interests, radius, image },
        "post");
      return res.access_token;
    }
    
  /** Login a user */
  
  static async login(username, password) {
    let res = await this.request("login", { username, password }, "post");
    return res.access_token;
  }
  
  /** Get individual user information */
  static async getUserInfo() {
    let res = await this.request(`profile`);
    return res.user;
  }

  /**Update individual user information */

  static async updateUserInfo(username, firstName, password, age, zipCode, bio,
      hobbies, interests, radius, image) {
    let res = await this.request(`update`,
      { username, firstName, password, age, zipCode, bio, hobbies, interests, 
        radius, image },
      "patch");
    return res.user;
  }
  
}

export default FrienderApi;