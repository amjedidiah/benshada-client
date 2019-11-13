import axios from "axios";

export default axios.create({
  baseURL: "https://alpha-benshada-api.herokuapp.com/api",
  headers: {"Content-Type": "application/json"}
});
