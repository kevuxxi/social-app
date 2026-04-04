import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectMyReactionType, selectReactionState } from "../../redux/selectors";
import "./PostActions.scss"
import { fetchPostReactionsRequested, toggleLikeRequested } from "../../redux/slices/reactionsSlice";

const REACTIONS = [
    { type: "LIKE", emoji: "\u{1F44D}", label: "Like" },
    { type: "LOVE", emoji: "\u{2764}\u{FE0F}", label: "Love" },
    { type: "HAHA", emoji: "\u{1F602}", label: "Haha" },
    { type: "WOW", emoji: "\u{1F62E}", label: "Wow" },
    { type: "SAD", emoji: "\u{1F622}", label: "Sad" },
    { type: "DISLIKE", emoji: "\u{1F44E}", label: "Dislike" }
];

const PostActions = ({ postId, userId }) => {
    const { reactionCounts, totalCount, loading, error } = useSelector(selectReactionState(postId));
    const myReactionType = useSelector(selectMyReactionType(postId));
    const reactionEntry = useSelector((state) => state.reactions?.byPostId?.[postId]);
    const isDisabled = !postId || !userId || loading
    const dispatch = useDispatch()

    useEffect(() => {
        if (!postId) return
        if (reactionEntry?.loading) return
        if (reactionEntry) return
        dispatch(fetchPostReactionsRequested(postId))
    }, [dispatch, postId, reactionEntry])

    const handleReactionClick = (type) => {
        if (loading || !userId) return
        dispatch(toggleLikeRequested({ postId, reactionType: type }))
    }

    return (
        <div className="post-actions">
            <div className="post-actions__reactions" role="group" aria-label="Reacciones">
                {REACTIONS.map((reaction) => {
                    const isActive = myReactionType === reaction.type
                    const count = reactionCounts?.[reaction.type] ?? 0
                    return (
                        <button
                            key={reaction.type}
                            type="button"
                            className={`post-actions__reaction ${isActive ? "post-actions__reaction--active" : ""}`}
                            aria-pressed={isActive}
                            disabled={isDisabled}
                            onClick={() => handleReactionClick(reaction.type)}
                            title={`${reaction.label}${count > 0 ? ` (${count})` : ""}`}
                        >
                            <span className="post-actions__emoji" aria-hidden="true">{reaction.emoji}</span>
                            {count > 0 && <span className="post-actions__reaction-count">{count}</span>}
                            <span className="post-actions__reaction-label">{reaction.label}</span>
                        </button>
                    )
                })}
            </div>
            <div className="post-actions__total" aria-live="polite">
                {totalCount}
            </div>
            {error && <div className="post-actions__error">{error}</div>}
        </div>
    )
}

export default PostActions
