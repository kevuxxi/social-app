import { useSelector } from "react-redux"
import { FiHeart } from "react-icons/fi"
import { selectReactionState } from "../../redux/selectors";
import "./PostActions.scss"

const PostActions = ({ postId }) => {
    const { likeCount, likedByMe, loading, error } = useSelector(selectReactionState(postId));
    const isDisabled = !postId || loading;

    return (
        <div className="post-actions">
            <button
                type="button"
                className={`post-actions__btn ${likedByMe ? "post-actions__btn--active" : ""}`}
                aria-pressed={likedByMe}
                disabled={isDisabled}
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
