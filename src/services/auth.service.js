// import axios from 'axios';

import api from "@/lib/axios";

export const login = async (email, password) => {
    const response = await api.post(`auth/login`, {
        email,
        password,
    });

    // Simpan token di localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const getMe = async () => {
    const token = localStorage.getItem('token');
    const response = await api.get(`auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
