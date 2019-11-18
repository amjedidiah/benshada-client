import axios from "axios";

export default axios.create({
  baseURL: window.location.href.includes("localhost")
    ? "http://localhost:8000/api"
    : "",
  headers: { "Content-Type": "application/json" }
});
