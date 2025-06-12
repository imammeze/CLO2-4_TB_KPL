import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk menangani response
const handleResponse = (response) => {
  return response.data;
};

// Fungsi untuk menangani error
const handleError = (error) => {
  if (error.response) {
    // Request dibuat dan server merespons dengan status code
    // yang berada di luar rentang 2xx
    console.error("API Error Response:", error.response.data);
    // Kita bisa melempar pesan error yang lebih user-friendly
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    // Request dibuat tapi tidak ada respons yang diterima
    console.error("API Error Request:", error.request);
    throw new Error("Cannot connect to the server. Please check your network.");
  } else {
    // Sesuatu terjadi saat menyiapkan request yang memicu Error
    console.error("API Error Message:", error.message);
    throw error;
  }
};

export const tenantService = {
  getTenants: () => api.get("/tenants").then(handleResponse).catch(handleError),
  getTenantById: (id) =>
    api.get(`/tenants/${id}`).then(handleResponse).catch(handleError),
  createTenant: (data) =>
    api.post("/tenants", data).then(handleResponse).catch(handleError),
  updateTenant: (id, data) =>
    api.patch(`/tenants/${id}`, data).then(handleResponse).catch(handleError),
  deleteTenant: (id) =>
    api.delete(`/tenants/${id}`).then(handleResponse).catch(handleError),
};
