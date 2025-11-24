import PostList from '../../components/Feed/PostList'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

const FeedPage = () => {
    const list = useSelector((state) => state.posts.posts)
    const loading = useSelector((state) => state.posts.loading)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts({ page: 1, limit: 10 }))
    }, [dispatch])



    return (
        <div>
            {list.length === 0 && <p>No hay Posts disponibles</p>}

            {loading ? <ClipLoader
                color="#FFFFFF"
                size={20}
            />
                : <PostList posts={list} />
            }

        </div>
    )
}

export default FeedPage