import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import { GET_POST_BY_SLUG_RESULT } from "@/sanity/lib/types"

export default function PostAuthor({ author }: { author: GET_POST_BY_SLUG_RESULT["author"] }) {
  if (!author) return null
  return (
    <div className="mb-8 flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={author.imageUrl} alt={author.name || "Author"} className="object-cover" />
        <AvatarFallback className="bg-muted text-muted-foreground font-medium">
          {getInitials(author.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="text-foreground text-base font-semibold">{author.name}</h3>
        <p className="text-muted-foreground text-sm">{author.role}</p>
      </div>
    </div>
  )
}
