import axiosInstance from "./axiosInstance";


export const getUserById = async (id) => {
    try {
        return await axiosInstance.get(`/users/${id}`);
    } catch (error) {
        console.error('Error al obtener al usuario:', error);
        throw error;
    }
}
