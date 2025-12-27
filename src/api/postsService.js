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
        const response = await axiosInstance.get(`/posts/allpost`, {
            params: { page, limit }
        });
        const posts = response?.data?.posts ?? response?.data?.data ?? []
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

export const getPostById = async (post_id) => {
    try {
        if (!post_id) throw new Error('Post id required')

        const response = await axiosInstance.get(`/posts/postById/${String(post_id)}`);
        const postById = response.data?.post ?? response.data?.data ?? response.data

        if (!postById) throw new Error('Post not found')
        return postById
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}

export const createPost = async ({ userId, content, image_url }) => {
    try {
        const response = await axiosInstance.post(`/posts/CreatePost/${userId}`, { content, image_url });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}

export const deletePost = async (id) => {
    try {
        return await axiosInstance.delete(`/posts/removePost/${id}`)
    } catch (error) {
        console.error(`Error al eliminar el post con ID ${id}:`, error);
        throw error;
    }
}
