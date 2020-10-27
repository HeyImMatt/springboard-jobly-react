import axios from 'axios';
import { TOKEN_STORAGE_ID } from "./App.js"

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

export default class JoblyApi {
  static async request(endpoint, params = {}, verb = "get") {

    let _token = localStorage.getItem(TOKEN_STORAGE_ID) || 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc" +
    "3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30." +
    "COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U";

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(
        `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
    } else if (verb === "post") {
      q = axios.post(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(
        `${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(search) {
    let res = await this.request("companies", { search });
    return res.companies;
  }

  static async getJobs(search) {
    let res = await this.request("jobs", { search });
    return res.jobs;
  }
}