import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import { GET_POSTS } from "@/sanity/lib/queries"
import { GET_POSTS_RESULT } from "@/sanity/lib/types"
import JournalDisplay from "@/components/journal-display"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Journal({ params }: Props) {
  const { locale } = await params

  const posts = await client.fetch<GET_POSTS_RESULT[]>(GET_POSTS, { locale })

  if (!posts.length) return notFound()

  return <JournalDisplay posts={posts} locale={locale} />
}
