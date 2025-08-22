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
