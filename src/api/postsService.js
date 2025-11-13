import axiosInstance from "./axiosInstance";

export const getPosts = async () => {
    try {
        const response = await axiosInstance.get(`/allpost`, {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        throw error;
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axiosInstance.get(`/postById/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}

export const createPost = async (userId, postData) => {
    try {
        const response = await axiosInstance.post(`/CreatePost/${userId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}

export const deletePost = async (id) => {
    try {
        return await axiosInstance.delete(`/removePost/${id}`)
    } catch (error) {
        console.error(`Error al eliminar el post con ID ${id}:`, error);
        throw error;
    }
}
