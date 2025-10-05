import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://project-404team1-backend.onrender.com/api",
});
