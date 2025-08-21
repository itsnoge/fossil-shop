import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import Image from "next/image"
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
  PortableTextTypeComponentProps,
} from "@portabletext/react"
import { SanityImageAssetDocument } from "next-sanity"
import { PortableTextBlock } from "@portabletext/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getTranslations } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

type LinkMark = {
  _type: "link"
  href: string
  blank?: boolean
}

type ImageType = {
  _type: "image"
  asset?: SanityImageAssetDocument
  alt?: string
}

type LocalizedString = {
  _type: string
  en: string
  fr?: string
}

type Author = {
  name: string
  role: string
  imageUrl?: string
}

type MainImage = {
  asset?: { url: string }
  alt?: string
}

type Post = {
  _id: string
  title: LocalizedString
  slug: { [locale: string]: { current: string } }
  author?: Author
  mainImage?: MainImage
  body?: { [locale: string]: PortableTextBlock[] } // body localisé
}

// ─── Utilitaires ─────────────────────────────
function getLocalizedString(field: LocalizedString, locale: string) {
  return field[locale as keyof LocalizedString] ?? field.en
}

function getLocalizedBody(body: Post["body"], locale: string): PortableTextBlock[] {
  return body?.[locale] ?? body?.en ?? []
}

// ─── PortableText components ───────────────────────
const ptComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: PortableTextTypeComponentProps<ImageType>) => {
      const src = value.asset?._ref ? urlFor(value.asset).url() : value.asset?.url
      return (
        <Image
          src={src || "/placeholder.svg"}
          alt={value.alt || "Image"}
          className="my-12 w-full rounded object-cover"
          width={800}
          height={600}
        />
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="font-figtree mb-8 text-4xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="font-figtree mb-6 text-3xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="font-figtree mb-5 text-2xl font-semibold">{children}</h3>,
    h4: ({ children }) => <h4 className="font-figtree mb-5 text-xl font-semibold">{children}</h4>,
    normal: ({ children }) => <p className="mb-6">{children}</p>,
  },
  list: {
    bullet: (props) => <ul className="mb-6 ml-5">{props.children}</ul>,
    number: (props) => <ol className="mb-6 ml-5">{props.children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-3 ml-5 list-disc pl-2">{children}</li>,
    number: ({ children }) => <li className="mb-3 ml-5 list-decimal pl-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),
  },
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const postQuery = `*[_type == "post" && slug.${params.locale}.current == $slug][0]{
    title
  }`

  const post: { title: { en: string; fr?: string } } | null = await client.fetch(postQuery, {
    slug: params.slug,
  })

  if (!post) return { title: "Not Found - Fossil", description: "" }

  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" })

  const postTitle = post.title[params.locale as keyof typeof post.title] ?? post.title.en

  return {
    title: `${postTitle} - Fossil`,
    description: t("journal.description"),
  }
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

  const post: Post | null = await client.fetch(query, { slug })

  if (!post) return notFound()

  const postTitle = getLocalizedString(post.title, locale)
  const postBody = getLocalizedBody(post.body, locale)

  return (
    <div className="mx-auto max-w-3xl font-sans">
      <h1 className="font-figtree mt-10 mb-8 text-4xl font-bold">{postTitle}</h1>

      {post.mainImage?.asset?.url && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || "Main image"}
          className="my-10 aspect-[16/9] w-full rounded object-cover"
          width={800}
          height={600}
        />
      )}

      <div className="mb-8 flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={post.author?.imageUrl} alt="Averee M." className="object-cover" />
          <AvatarFallback className="bg-muted text-muted-foreground font-medium">
            {post.author?.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <h3 className="text-foreground text-base font-semibold">{post.author?.name}</h3>
          <p className="text-muted-foreground text-sm">{post.author?.role}</p>
        </div>
      </div>

      {postBody.length > 0 && (
        <div className="prose max-w-full rounded bg-gray-50 p-12">
          <PortableText value={postBody} components={ptComponents} />
        </div>
      )}
    </div>
  )
}
