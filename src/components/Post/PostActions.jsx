import { useSelector, useDispatch } from "react-redux"
import { FiHeart } from "react-icons/fi"
import { selectReactionState } from "../../redux/selectors";
import "./PostActions.scss"
import { toggleLikeRequested } from "../../redux/slices/reactionsSlice";

const PostActions = ({ postId, userId }) => {
    const { likeCount, likedByMe, loading, error } = useSelector(selectReactionState(postId));
    const isDisabled = !postId || !userId || loading
    const dispatch = useDispatch()

    const handleLikeClick = () => {
        if (loading || !userId) return
        dispatch(toggleLikeRequested({ postId, userId }))
    }


    return (
        <div className="post-actions">
            <button
                type="button"
                className={`post-actions__btn ${likedByMe ? "post-actions__btn--active" : ""}`}
                aria-pressed={likedByMe}
                disabled={isDisabled}
                onClick={handleLikeClick}
            >
                <FiHeart className="post-actions__icon" aria-hidden="true" />
                {loading ? "Cargando..." : likedByMe ? "Te gusta" : "Me gusta"}
            </button>
            <div className="post-actions__count" aria-live="polite">
                {likeCount}
            </div>
            {error && <div className="post-actions__error">{error}</div>}
        </div>
    )
}

export default PostActions
