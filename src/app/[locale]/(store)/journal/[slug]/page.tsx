import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { GET_POST_BY_SLUG } from "@/sanity/lib/queries"
import { GET_POST_BY_SLUG_RESULT } from "@/sanity/lib/types"
import { PortableTextComponents } from "@/components/portable-text"
import { PostHeader } from "@/components/post-header"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function JournalPost({ params }: Props) {
  const { locale, slug } = await params

  const post = await client.fetch<GET_POST_BY_SLUG_RESULT>(GET_POST_BY_SLUG, {
    slug,
    locale,
  })

  if (!post) return notFound()

  return (
    <div className="mx-auto max-w-5xl font-sans">
      <PostHeader
        title={post.title}
        author={post.author}
        publishedAt={post.publishedAt}
        locale={locale}
      />
      {post.mainImage?.url && (
        <Image
          src={post.mainImage.url || "/placeholder.png"}
          alt={post.mainImage.alt || "Main image"}
          className="my-10 aspect-video w-full object-cover"
          width={800}
          height={600}
          priority
        />
      )}

      {post.body.length > 0 && (
        <div className="prose max-w-full lg:p-12">
          <PortableText value={post.body} components={PortableTextComponents} />
        </div>
      )}
    </div>
  )
}
