import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // backend URL
});

// Optional: Auth token setup
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // if you store JWT
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
