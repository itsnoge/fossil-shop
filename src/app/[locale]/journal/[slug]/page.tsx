import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { getLocalized } from "@/app/lib/utils"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function JournalPost({ params }: Props) {
  const { locale, slug } = await params

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

  const ptComponents = {
    types: {
      image: ({ value }: any) => {
        const src = value.asset?._ref ? urlFor(value.asset).url() : value.asset?.url
        return (
          <img
            src={src || "/placeholder.svg"}
            alt={value.alt || "Image"}
            className="my-12 w-full rounded object-cover"
          />
        )
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="mt-16 mb-8 text-4xl font-bold text-gray-900">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="mt-14 mb-6 text-3xl font-semibold text-gray-900">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="mt-12 mb-5 text-2xl font-semibold text-gray-900">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="mt-10 mb-4 text-xl font-semibold text-gray-900">{children}</h4>
      ),
      normal: ({ children }: any) => (
        <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>
      ),
    },
    listItem: {
      bullet: ({ children, level }: any) => (
        <li className={`ml-${level * 4} mb-3 ml-5 list-disc pl-2 text-sm text-gray-700`}>
          {children}
        </li>
      ),
      number: ({ children, level }: any) => (
        <li className={`ml-${level * 4} mb-3 ml-5 list-decimal pl-2 text-sm text-gray-700`}>
          {children}
        </li>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target={value.blank ? "_blank" : "_self"}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <div className="mx-auto max-w-3xl font-sans">
      {/* Titre principal */}
      <h1 className="font-figtree mb-8 text-4xl font-bold">{localizedPost.title}</h1>

      {/* Image principale */}
      {localizedPost.mainImage?.asset?.url && (
        <img
          src={localizedPost.mainImage.asset.url}
          alt={localizedPost.mainImage.alt || "Main image"}
          className="my-10 aspect-[16/9] w-full rounded object-cover"
        />
      )}

      {/* Auteur */}
      <p className="mb-8 text-gray-600">By {localizedPost.author?.name}</p>

      {/* Contenu du post */}
      {localizedPost.body && (
        <div className="prose prose-lg max-w-full rounded bg-gray-50 p-12">
          <PortableText value={localizedPost.body} components={ptComponents} />
        </div>
      )}
    </div>
  )
}
