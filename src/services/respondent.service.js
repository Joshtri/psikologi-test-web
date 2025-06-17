// src/services/respondent.service.js
import api from "@/lib/axios";

// Create: Kirim form responden baru
export const submitRespondentForm = async (data) => {
  const response = await api.post("api/respondents", data);
  return response.data;
};

// Read: Ambil semua data responden
export const getRespondents = async () => {
  const response = await api.get("api/respondents");
  return response.data;
};

// Read: Ambil satu responden berdasarkan ID
export const getRespondentById = async (id) => {
  const response = await api.get(`api/respondents/${id}`);
  return response.data;
};

// Update: Perbarui data responden berdasarkan ID
export const updateRespondent = async (id, data) => {
  const response = await api.put(`api/respondents/${id}`, data);
  return response.data;
};

// Delete: Hapus responden berdasarkan ID
export const deleteRespondent = async (id) => {
  const response = await api.delete(`api/respondents/${id}`);
  return response.data;
};
