import PostCard from "../Post/PostCard"



const PostList = ({ posts }) => {
    return (
        <div>
            {posts.posts.map((posts) => (
                <li key={posts.post_id}>
                    <PostCard >
                        {posts.user_id}
                        {posts.content}
                        {posts.image_url}
                        {posts.created_at}
                    </PostCard>
                </li>))}
        </div>
    )
}

export default PostList