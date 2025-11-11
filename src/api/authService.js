import axiosInstance from "./axiosInstance";

export const registerUser = async (data) => {
    try {
        return await axiosInstance.post('/auth/register', data);
    } catch (error) {
        console.error('Error al registrarse:', error);
        throw error;
    }
}

export const loginUser = async (data) => {
    try {
        return await axiosInstance.post('/auth/login', data)
    } catch (error) {
        console.error('Error al iniciar sesion:', error);
        throw error;
    }
}
