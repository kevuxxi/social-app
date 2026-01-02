import PostCard from "../Post/PostCard"
import "./PostList.scss"

const PostList = ({ posts = [] }) => {
  if (!Array.isArray(posts) || posts.length === 0) return null

  return (
    <ul className="post-list">
      {posts.map((post, index) => (
        <li key={post.post_id ?? post.id ?? `post-${index}`} className="post-list__item">
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
}

export default PostList
