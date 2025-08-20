import { client } from "@/sanity/lib/client"
import { getLocalized } from "@/app/lib/utils"
import { notFound } from "next/navigation"
import Link from "next/link"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Journal({ params }: Props) {
  const { locale } = await params

  const query = `*[_type == "post"]{
  _id,
  "title": title,
  "slug": slug,
  "author": author->{
    name,
    role,
    "imageUrl": image.asset->url
  },
  "categories": categories[]->{
    title,
    slug
  },
  mainImage{
    asset->{
      url
    },
    alt
  },
  publishedAt,
  body
}
`

  const posts = await client.fetch(query)

  // Localiser chaque post
  const localizedPosts = posts.map((post: any) => getLocalized(post, locale))

  if (!localizedPosts.length) return notFound()

  return (
    <div>
      <h1>Journal</h1>
      <ul>
        {localizedPosts.map((post: any) => (
          <li key={post._id}>
            <Link href={`/${locale}/journal/${post.slug.current}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
