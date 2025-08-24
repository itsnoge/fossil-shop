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

export type GET_PRODUCTS_RESULT = {
  _id: string
  title: string
  slug: string
  publishedAt: string | null
  price: number | null
  discount?: {
    active: boolean
    percentage: number
  } | null
  mainImage?: {
    url: string
    alt?: string
  } | null
  hoverImage?: {
    url: string
    alt?: string
  } | null
  categories?:
    | {
        _id: string
        title: string
        slug: string
      }[]
    | null
}

export type GET_PRODUCT_BY_SLUG_RESULT = {
  _id: string
  title: string
  slug: string
  publishedAt: string | null
  price: number | null
  discount?: {
    active: boolean
    percentage: number
  } | null
  mainImage?: {
    url: string
    alt?: string
  } | null
  hoverImage?: {
    url: string
    alt?: string
  } | null
  gallery?:
    | {
        url: string
        alt?: string
      }[]
    | null
  categories?:
    | {
        _id: string
        title: string
        slug: string
      }[]
    | null
  sizes?:
    | {
        size: string
        stock: number
      }[]
    | null
}

export type GET_CATEGORIES_RESULT = {
  _id: string
  title: string
  slug: string
}
