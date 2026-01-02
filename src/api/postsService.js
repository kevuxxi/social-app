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
        const apiPagination = response?.data?.pagination
        const pagination = {
            page: apiPagination?.page ?? page,
            limit: apiPagination?.limit ?? limit,
            total: typeof apiPagination?.total === 'number' ? apiPagination.total : null
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
        const data = response.data;

        const postById = data?.post ?? data?.data ?? data?.["0"];

        if (!postById) throw new Error('Post not found')
        return postById
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}
export const getPostByUserId = async (userId, { page = 1, limit = 10 } = {}) => {
    try {
        if (!userId) throw new Error('userId is required')

        const response = await axiosInstance.get(`/posts/postByUserId/${String(userId)}`,
            { params: { page, limit } }
        );
        const data = response?.data
        const posts = Array.isArray(data)
            ? data
            : (data?.posts ?? data?.data ?? Object.values(data ?? {}))
        const apiPagination = data?.pagination
        const pagination = {
            page: apiPagination?.page ?? page,
            limit: apiPagination?.limit ?? limit,
            total: typeof apiPagination?.total === 'number' ? apiPagination.total : posts.length
        }

        return { posts, pagination }
    } catch (error) {
        const message = error?.response?.data?.message
            ?? error?.response?.data?.error
            ?? error?.message
            ?? "Unable to fetch user posts"
        console.error('Error al obtener el post:', error);
        throw new Error(message);
    }
}

export const createPost = async ({ userId, content, imageFile }) => {
    try {
        const formData = new FormData()
        formData.append('content', content)
        if (imageFile) {
            formData.append('image', imageFile)
        }
        const response = await axiosInstance.post(`/posts/CreatePost/${userId}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}
export const deletePost = async (id) => {
    try {
        if (!id) throw new Error("Post id is required")
        const response = await axiosInstance.delete(`/posts/removePost/${id}`)
        return response?.data ?? true
    } catch (error) {
        const message = error?.response?.data?.message
            ?? error?.response?.data?.error
            ?? error?.message
            ?? "Unable to delete post"
        console.error(`Error al eliminar el post con ID ${id}:`, error);
        throw new Error(message)
    }
}

