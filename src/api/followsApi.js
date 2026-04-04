import axiosInstance from "./axiosInstance";

export const follow = async (targetId) => {
    try {
        const response = await axiosInstance.post(`/follows/users/${targetId}/follow`)
        return response.data
    } catch (error) {
        console.error('Error al seguir al usuario:', error);
        throw error;
    }
}

export const unfollow = async (targetId) => {
    try {
        const response = await axiosInstance.post(`/follows/users/${targetId}/unfollow`)
        return response.data
    } catch (error) {
        console.error('Error al  dejar de seguir al usuario:', error);
        throw error;
    }
}


export const getFollowingFeed = async () => {
    try {
        const response = await axiosInstance.get(`/follows/feed`);
        const data = response?.data?.posts ?? response?.data?.data ?? []
        const posts = data

        if (!posts) throw new Error('Posts not found')
        return posts
    } catch (error) {
        console.error('Error al obtener los posts del feed:', error);
        throw error;
    }

}

