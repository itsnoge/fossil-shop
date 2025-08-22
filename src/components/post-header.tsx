import { FormattedDate } from "@/components/formatted-date"
import PostAuthor from "@/components/post-author"
import { GET_POST_BY_SLUG_RESULT } from "@/sanity/lib/types"

type PostHeaderProps = {
  title: string
  author?: GET_POST_BY_SLUG_RESULT["author"]
  publishedAt?: string
  locale: string
}

export function PostHeader({ title, author, publishedAt, locale }: PostHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      {publishedAt && (
        <FormattedDate
          date={publishedAt}
          locale={locale}
          className="text-muted-foreground font-sans text-sm"
        />
      )}
      <h1 className="font-figtree mb-2 max-w-xl text-4xl font-bold">{title}</h1>
      {author && <PostAuthor author={author} />}
    </div>
  )
}
