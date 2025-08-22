import { GET_POSTS_RESULT } from "@/sanity/lib/types"
import PostCard from "./post-card"

type PostSectionProps = {
  title?: string
  posts: GET_POSTS_RESULT[]
  locale: string
  firstPostImageClass?: string
  otherPostsImageClass?: string
}

export default function PostSection({
  title,
  posts,
  locale,
  firstPostImageClass,
  otherPostsImageClass,
}: PostSectionProps) {
  if (!posts.length) return null

  return (
    <div className="mb-20 grid grid-cols-1 gap-3 lg:grid-cols-3">
      {title && <p className="col-span-full font-sans text-2xl font-semibold">{title}</p>}
      {posts.map((post, index) => (
        <PostCard
          key={post._id}
          post={post}
          locale={locale}
          imageClassName={index === 0 ? firstPostImageClass : otherPostsImageClass}
        />
      ))}
    </div>
  )
}
