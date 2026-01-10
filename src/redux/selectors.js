export const selectUserId = (state) => state.auth?.user?.id ?? null;

export const selectReactionState = (postId) => (state) =>
    state.reactions?.byPostId?.[postId] ?? {
        likeCount: 0,
        likedByMe: false,
        loading: false,
        error: null
    };

export const selectCommentsState = (postId) => (state) =>
    state.comments?.byPostId?.[postId] ?? {
        items: [],
        loading: false,
        creating: false,
        error: null
    };

export const selectIsFollowing = (userId) => (state) =>
    state.follows?.byUserId?.[userId]?.isFollowing ?? false;

export const selectFollowingFeed = (state) => state.feed?.following ?? {
    items: [],
    loading: false,
    error: null,
    fetchedAt: null
};
