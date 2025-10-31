import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// add interceptors when implementing the login feature
