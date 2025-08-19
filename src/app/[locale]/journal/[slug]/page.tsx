import { client } from "@/sanity/lib/client"
import { getLocalized } from "@/app/lib/utils"
import { notFound } from "next/navigation"
import { PortableText } from "next-sanity"

type Props = {
  params: { locale: string; slug: string }
}

export default async function JournalPost({ params }: Props) {
  const { locale, slug } = params

  // Requête Sanity pour récupérer le post correspondant au slug
  const query = `*[_type == "post" && slug.${locale}.current == $slug][0]{
    _id,
    title,
    slug,
    author->{
      name,
      role,
      "imageUrl": image.asset->url
    },
    mainImage{
      asset->{url},
      alt
    },
    body
  }`
  const post = await client.fetch(query, { slug })

  if (!post) return notFound()

  const localizedPost = getLocalized(post, locale)

  return (
    <div>
      <h1>{localizedPost.title}</h1>
      <img
        className="w-96"
        src={localizedPost.mainImage.asset.url}
        alt={localizedPost.mainImage.alt}
      />
      <p>By {localizedPost.author?.name}</p>
      <PortableText value={localizedPost.body} />
    </div>
  )
}
