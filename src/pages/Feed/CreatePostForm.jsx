import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, setCreateSuccess } from '../../redux/slices/postsSlice'
import { ClipLoader } from 'react-spinners'
import { FiImage, FiX } from 'react-icons/fi'
import './CreatePostForm.scss'

const CreatePostForm = () => {
    const dispatch = useDispatch()
    const { createLoading, createError, createSuccess } = useSelector((state) => state.posts)
    const userId = useSelector((s) => s.auth.user?.id)
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const fileInputRef = useRef(null)

    const isValid = content.trim().length > 0
    const maxChars = 500
    const remainingChars = maxChars - content.length

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        if (!userId) return
        dispatch(createPost({ userId, content, imageFile }))
    }
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        if (!createSuccess) return
        setContent("")
        setImageFile(null)
        setImagePreview(null)
        setIsExpanded(false)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        dispatch(setCreateSuccess(false))
    }, [createSuccess, dispatch])

    const handleExpand = () => {
        setIsExpanded(true)
    }

    const handleCollapse = () => {
        if (!content && !imageFile) {
            setIsExpanded(false)
        }
    }

    return (
        <div className="create-post-wrapper">
            {createError && <p className="create-post__error">{createError}</p>}
            {createLoading && (
                <div className="feed-page__loader" aria-live="polite">
                    <ClipLoader color="#c7d2fe" size={34} />
                    <p>Creando post...</p>
                </div>
            )}
            {createSuccess && <p className="create-post__success">Post creado!</p>}

            {!isExpanded ? (
                <button
                    type="button"
                    className="create-post__trigger"
                    onClick={handleExpand}
                >
                    <span className="create-post__trigger-text">¿Qué quieres compartir?</span>
                    <FiImage size={20} />
                </button>
            ) : (
                <form className="create-post" onSubmit={handleSubmit}>
                <div className="create-post__textarea-wrapper">
                    <textarea
                        className="create-post__input create-post__textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Escribe aqui...'
                        maxLength={maxChars}
                    ></textarea>
                    <div className="create-post__char-counter" data-warning={remainingChars < 50}>
                        {remainingChars} caracteres restantes
                    </div>
                </div>

                {imagePreview && (
                    <div className="create-post__preview">
                        <img src={imagePreview} alt="Preview" />
                        <button
                            type="button"
                            className="create-post__preview-remove"
                            onClick={handleRemoveImage}
                            aria-label="Remover imagen"
                        >
                            <FiX size={18} />
                        </button>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    className="create-post__file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="image-upload"
                />
                <div className="create-post__actions">
                    <button
                        type="button"
                        className="create-post__cancel"
                        onClick={handleCollapse}
                    >
                        Cancelar
                    </button>
                    <div className="create-post__actions-right">
                        <label htmlFor="image-upload" className="create-post__image-btn">
                            <FiImage size={18} />
                        </label>
                        <button className="create-post__button" type="submit" disabled={!isValid || createLoading}>
                            Publicar
                        </button>
                    </div>
                </div>
            </form>
            )}
        </div>
    )
}

export default CreatePostForm

