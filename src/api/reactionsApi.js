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
        const reactionPayload = data?.post ?? data?.data ?? data;

        if (Array.isArray(reactionPayload)) {
            return reactionPayload
        }

        if (Array.isArray(reactionPayload?.reactions)) {
            return reactionPayload.reactions
        }

        if (!reactionPayload) {
            return []
        }
        return reactionPayload
    } catch (error) {
        if (error?.response?.status === 404 || error?.status === 404) {
            return []
        }
        console.error('Error al obtener la reaccion del post:', error);
        throw error;
    }

}

// GET /:uid/:pid/byUserInPost - Obtiene la reaccion de un usuario a un post
export const getUserReactionInPost = async (userId, postId) => {
    try {
        if (!userId || !postId) throw new Error('User id and post id required')

        const response = await axiosInstance.get(`/reactions/${String(userId)}/${String(postId)}/byUserInPost`);
        const data = response.data;
        // Response: { ok: true, data: { status: true, reaction: "SAD", userId: 1, postId: 3 } }
        return data?.data ?? null;
    } catch (error) {
        if (error?.response?.status === 404 || error?.status === 404) {
            return null;
        }
        console.error('Error al obtener la reaccion del usuario en el post:', error);
        throw error;
    }
}

// GET /:uid/:cid/byUserInComment - Obtiene la reaccion de un usuario a un comentario
export const getUserReactionInComment = async (userId, commentId) => {
    try {
        if (!userId || !commentId) throw new Error('User id and comment id required')

        const response = await axiosInstance.get(`/reactions/${String(userId)}/${String(commentId)}/byUserInComment`);
        const data = response.data;
        // Response: { ok: true, data: { reaction: null, userId: 1, commentId: 1 } }
        return data?.data ?? null;
    } catch (error) {
        if (error?.response?.status === 404 || error?.status === 404) {
            return null;
        }
        console.error('Error al obtener la reaccion del usuario en el comentario:', error);
        throw error;
    }
}
