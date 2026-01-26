export const selectUserId = (state) => state.auth?.user?.id ?? null;

export const selectReactionState = (postId) => (state) =>
    state.reactions?.byPostId?.[postId] ?? {
        reactionCounts: {},
        totalCount: 0,
        myReactionType: null,
        loading: false,
        error: null
    };

export const selectReactionCounts = (postId) => (state) =>
    state.reactions?.byPostId?.[postId]?.reactionCounts ?? {};

export const selectTotalReactionCount = (postId) => (state) =>
    state.reactions?.byPostId?.[postId]?.totalCount ?? 0;

export const selectMyReactionType = (postId) => (state) =>
    state.reactions?.byPostId?.[postId]?.myReactionType ?? null;

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
