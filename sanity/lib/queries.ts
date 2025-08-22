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
