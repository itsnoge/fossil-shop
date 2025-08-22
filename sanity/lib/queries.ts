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
    slug,
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
