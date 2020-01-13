import axios from "axios";

export default axios.create({
  baseURL: window.location.href.includes("localhost")
    ? "https://localhost:8000/api"
    : "https://temp-benshada-alpha-api.herokuapp.com/api",
  headers: { "Content-Type": "application/json" }
});
