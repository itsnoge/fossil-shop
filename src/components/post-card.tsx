import { Link } from "@/i18n/navigation"
import { GET_POSTS_RESULT } from "@/sanity/lib/types"
import Image from "next/image"

type PostCardProps = {
  post: GET_POSTS_RESULT
  className?: string
  imageClassName?: string
  locale?: string
}

export default function PostCard({
  post,
  className = "",
  imageClassName = "w-full h-64 object-cover",
  locale,
}: PostCardProps) {
  return (
    <Link href={`/journal/${post.slug}`} className={`group relative h-fit pb-4 ${className}`}>
      {post.mainImage && (
        <div className={` ${imageClassName}`}>
          <Image
            src={post.mainImage.url ?? "/placeholder.png"}
            alt={post.mainImage.alt ?? post.title}
            width={400}
            height={256}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <h4 className="font-figtree mt-4 inline-block pb-1 text-xl font-semibold">{post.title}</h4>

        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="text-muted-foreground font-sans text-xs">
            {new Date(post.publishedAt).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>
      <span className="bg-foreground absolute bottom-0 left-0 mt-4 h-[2px] w-0 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}
