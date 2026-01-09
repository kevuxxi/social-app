import axiosInstance from "./axiosInstance";

export const toggleReaction = async (userId, postId, status = "LIKE") => {
    try {
        const response = await axiosInstance.post(`/reactions/toggleReaction/${userId}/${String(postId)}`, { status })
        return response.data
    } catch (error) {
        console.error('Error al reaccionar:', error);
        throw error;
    }
}

export const getReactionsPost = async (postId) => {
    try {
        if (!postId) throw new Error('Post id required')

        const response = await axiosInstance.get(`/reactions/reactionsPost/${String(postId)}`);
        const data = response.data;

        const reactionById = data?.post ?? data?.data ?? data?.["0"];

        if (!reactionById) throw new Error('Post not found')
        return reactionById
    } catch (error) {
        console.error('Error al obtener la reaccion del post:', error);
        throw error;
    }

}

