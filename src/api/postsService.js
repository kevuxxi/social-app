import axiosInstance from "./axiosInstance";


/*   const posts = {
             id: postsData.post_id,
             userid: postsData.user_id,
             post: postsData.content,
             image: postsData.image_url,
             createdAt: postsData.created_at,
             modifiedAt: postsData.modified_at
         } */



export const getPosts = async ({ page = 1, limit = 10 } = {}) => {
    try {
        const response = await axiosInstance.get(`/allpost`, {
            params: { page, limit }
        });
        const posts = response?.data?.data ?? []
        const pagination = response?.data?.pagination ?? {
            page,
            limit,
            total: posts.length,
        }
        return { posts, pagination }
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
