import { defineQuery } from "next-sanity"

export const GET_POSTS = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current),
    publishedAt,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    categories[]->{
      "title": coalesce(title[$locale], title.en)
    }
  }
`)

export const GET_POST_BY_SLUG = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current),
    publishedAt,
    author->{
      name,
      role,
      "imageUrl": image.asset->url
    },
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "body": coalesce(body[$locale], body.en)
  }
`)

export const GET_PRODUCTS = defineQuery(`
  *[_type == "product"] | order(publishedAt desc) {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current),
    publishedAt,
    price,
    discount,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "hoverImage": {
      "url": hoverImage.asset->url,
      "alt": hoverImage.alt
    },
    categories[]->{
      _id,
      "title": coalesce(title[$locale], title.en),
      "slug": coalesce(slug.current, slug.current),
    },
    sizes[]{ "size": size, "stock": stock }
  }
`)

export const GET_PRODUCT_BY_SLUG = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current), 
    publishedAt,
    price,
    discount,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "hoverImage": {
      "url": hoverImage.asset->url,
      "alt": hoverImage.alt
    },
    gallery[]{
      "url": asset->url,
      alt
    },
    categories[]->{
      _id,
      "title": coalesce(title[$locale], title.en),
      "slug": coalesce(slug.current, slug.current),
    },
    sizes[]{ "size": size, "stock": stock }
  }
`)

export const GET_PRODUCTS_BY_CATEGORY = defineQuery(`
  *[_type == "product" && $categoryId in categories[]._ref] | order(publishedAt desc) {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current),
    publishedAt,
    price,
    discount,
    "mainImage": {
      "url": mainImage.asset->url,
      "alt": mainImage.alt
    },
    "hoverImage": {
      "url": hoverImage.asset->url,
      "alt": hoverImage.alt
    },
    categories[]->{
      _id,
      "title": coalesce(title[$locale], title.en),
      "slug": coalesce(slug.current, slug.current),
    },
    sizes[]{ "size": size, "stock": stock }
  }
`)

export const GET_CATEGORIES = defineQuery(`
  *[_type == "productCategory"] | order(title[$locale] asc) {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current),
  }
`)

export const GET_CATEGORY_BY_SLUG = defineQuery(`
  *[_type == "productCategory" && coalesce(slug.current, slug.current) == $slug][0] {
    _id,
    "title": coalesce(title[$locale], title.en),
    "slug": coalesce(slug.current, slug.current),
  }
`)
