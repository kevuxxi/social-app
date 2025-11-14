import PostList from '../../components/Feed/PostList'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const FeedPage = () => {
    const list = useSelector((state) => state.posts.posts)
    const loading = useSelector((state) => state.posts.loading)
    const dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch])



    return (
        <div>
            <PostList posts={list} />
        </div>
    )
}

export default FeedPage