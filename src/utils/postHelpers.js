export const getPostId = (post) => post?.post_id ?? post?.id ?? null

export const getPostUserId = (post) => post?.user?.id ?? post?.user_id ?? post?.userId ?? null

export const getPostUserName = (post) => post?.user?.username ?? post?.username ?? post?.user_name ?? null

export const getPostImageUrl = (post) => post?.image_url ?? post?.imageUrl ?? post?.image ?? null

export const getPostDate = (post) => post?.created_at ?? post?.createdAt ?? null

export const getPostContent = (post) => post?.content ?? post?.post ?? null
