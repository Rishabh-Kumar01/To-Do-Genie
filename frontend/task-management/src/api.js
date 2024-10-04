import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (username, password) =>
  api.post("/login", { username, password });
export const register = (username, email, password) =>
  api.post("/register", { username, email, password });
export const logout = () => api.post("/logout");
export const refreshToken = () => api.post("/refresh-token");
export const changePassword = (oldPassword, newPassword) =>
  api.post("/change-password", { oldPassword, newPassword });

export const getTasks = () => api.get("/tasks");
export const getTaskById = (id) => api.get(`/tasks/${id}`);
export const createTask = (task) => api.post("/tasks", task);
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
