import { PortableTextBlock } from "next-sanity"

export type GET_POSTS_RESULT = {
  _id: string
  title: string
  slug: string
  categories: { title: string }[] | null
  mainImage: {
    url: string
    alt?: string
  }
  publishedAt: string | null
}

export type GET_POST_BY_SLUG_RESULT = {
  _id: string
  title: string
  slug: string
  author?: {
    name: string
    role: string
    imageUrl?: string
  } | null
  categories: { title: string }[] | null
  mainImage?: {
    url: string
    alt?: string
  } | null
  publishedAt: string
  body: PortableTextBlock[]
}
