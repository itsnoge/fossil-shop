import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import { PortableTextBlock } from "@portabletext/types"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

type Author = {
  name: string
  role: string
  imageUrl?: string
}

type Category = {
  title: string
  slug: { current: string }
}

type MainImage = {
  asset?: { url: string }
  alt?: string
}
type LocalizedString = { [lang: string]: string }
type LocalizedSlug = { [lang: string]: { current: string } }
export type Post = {
  _id: string
  title: LocalizedString
  slug: LocalizedSlug
  author?: Author
  categories?: Category[]
  mainImage?: MainImage
  publishedAt?: string
  body?: PortableTextBlock[]
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" })
  return {
    title: t("journal.title"),
    description: t("journal.description"),
  }
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
  }`

  const posts: Post[] = await client.fetch(query)

  if (!posts.length) return notFound()

  return (
    <div className="mx-auto max-w-4xl p-8 font-sans">
      <h1 className="mb-8 text-4xl font-bold">Journal</h1>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              href={`journal/${post.slug[locale].current}`}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {post.title[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
