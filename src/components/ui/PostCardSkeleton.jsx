import './PostCardSkeleton.scss'

const PostCardSkeleton = () => {
  return (
    <div className="post-card-skeleton">
      <div className="post-card-skeleton__header">
        <div className="post-card-skeleton__avatar" />
        <div className="post-card-skeleton__meta">
          <div className="post-card-skeleton__line post-card-skeleton__line--title" />
          <div className="post-card-skeleton__line post-card-skeleton__line--subtitle" />
        </div>
      </div>
      <div className="post-card-skeleton__image" />
      <div className="post-card-skeleton__content">
        <div className="post-card-skeleton__line post-card-skeleton__line--full" />
        <div className="post-card-skeleton__line post-card-skeleton__line--full" />
        <div className="post-card-skeleton__line post-card-skeleton__line--half" />
      </div>
      <div className="post-card-skeleton__footer">
        <div className="post-card-skeleton__tag" />
        <div className="post-card-skeleton__tag" />
      </div>
    </div>
  )
}

export default PostCardSkeleton
