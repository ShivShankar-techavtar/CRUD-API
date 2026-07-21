import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Centralised error normaliser so every caller gets a plain string message.
const extractMessage = (error) => {
  if (error.response) {
    return (
      error.response.data?.message ||
      error.response.data?.errorMessage ||
      "Something went wrong."
    );
  }
  if (error.request) {
    return "Failed to connect to server.";
  }
  return error.message || "Something went wrong.";
};

export const getUsers = async (params = {}) => {
  try {
    const { data } = await api.get("/users", { params });
    return data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const getUserById = async (id) => {
  try {
    const { data } = await api.get(`/user/${id}`);
    return data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const createUser = async (payload) => {
  try {
    const { data } = await api.post("/user", payload);
    return data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const updateUser = async (id, payload) => {
  try {
    const { data } = await api.put(`/update/user/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await api.delete(`/delete/user/${id}`);
    return data;
  } catch (error) {
    throw new Error(extractMessage(error));
  }
};

export default api;
