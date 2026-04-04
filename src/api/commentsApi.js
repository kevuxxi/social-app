import axiosInstance from "./axiosInstance";

export const addComment = async (userId, postId, text) => {
    try {
        const response = await axiosInstance.post(
            `/comments/addComment/${userId}/${String(postId)}`,
            { comment_text: text }
        )
        return response.data
    } catch (error) {
        console.error('Error al comentar:', error);
        throw error;
    }
}

export const readComments = async (postId) => {
    try {
        if (!postId) throw new Error('Post id required')

        const response = await axiosInstance.get(`/comments/readComment/${String(postId)}`);
        const data = response?.data?.posts ?? response?.data?.data ?? []
        const comments = data

        if (!comments) throw new Error('Posts not found')
        return comments
    } catch (error) {
        console.error('Error al obtener los comentarios del post:', error);
        throw error;
    }

}

