import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, setCreateSuccess } from '../../redux/slices/postsSlice'
import { ClipLoader } from 'react-spinners'
import './CreatePostForm.scss'

const CreatePostForm = () => {
    const dispatch = useDispatch()
    const { createLoading, createError, createSuccess } = useSelector((state) => state.posts)
    const userId = useSelector((s) => s.auth.user?.id)
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null)

    const isValid = content.trim().length > 0

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        if (!userId) return
        dispatch(createPost({ userId, content, imageFile }))
    }
    useEffect(() => {
        if (!createSuccess) return
        setContent("")
        setImageFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        dispatch(setCreateSuccess(false))
    }, [createSuccess, dispatch])

    return (
        <div>
            {createError && <p className="create-post__error">{createError}</p>}
            {createLoading && (
                <div className="feed-page__loader" aria-live="polite">
                    <ClipLoader color="#c7d2fe" size={34} />
                    <p>Creando post...</p>
                </div>
            )}
            {createSuccess && <p className="create-post__success">Post creado!</p>}


            <form className="create-post" onSubmit={handleSubmit}>
                <div className="create-post__intro">
                    <h2 className="create-post__title">Crear post</h2>
                    <p className="create-post__subtitle">Comparte algo con la comunidad.</p>
                </div>
                <textarea
                    className="create-post__input create-post__textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Escribe aqui...'
                ></textarea>
                <input
                    ref={fileInputRef}
                    className="create-post__input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <div className="create-post__actions">
                    <button className="create-post__button" type="submit" disabled={!isValid || createLoading}>Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePostForm

