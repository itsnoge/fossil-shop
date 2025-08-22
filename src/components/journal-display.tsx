"use client"

import { GET_POSTS_RESULT } from "@/sanity/lib/types"
import { useTranslations } from "next-intl"
import PostSection from "@/components/post-section"

type Props = {
  posts: GET_POSTS_RESULT[]
  locale: string
}

export default function JournalDisplay({ posts, locale }: Props) {
  const tSections = useTranslations("Sections")
  const featuredTitles = ["featured", "en vedette"]

  const featuredPosts = posts.filter((post) =>
    post.categories?.some((cat) => featuredTitles.includes(cat.title.toLowerCase())),
  )

  const otherPosts = posts.filter(
    (post) => !post.categories?.some((cat) => featuredTitles.includes(cat.title.toLowerCase())),
  )

  return (
    <div className="font-sans lg:container lg:mx-auto">
      <h1 className="font-figtree mb-20 text-7xl font-semibold">Journal</h1>

      <PostSection
        title={`(${tSections("featured")})`}
        posts={featuredPosts}
        locale={locale}
        firstPostImageClass="h-96 lg:h-[32rem] w-full object-cover"
        otherPostsImageClass="h-64 lg:h-72 lg:h-80 w-full object-cover"
      />

      <PostSection
        posts={otherPosts}
        locale={locale}
        firstPostImageClass="h-64 lg:h-72 lg:h-80 w-full object-cover"
        otherPostsImageClass="h-64 lg:h-72 lg:h-80 w-full object-cover"
      />
    </div>
  )
}
