import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"
import { baseLanguage, localeString } from "./localeStringType"

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      type: "object",
      fields: [
        defineField({
          name: "fr",
          type: "slug",
          title: "Slug (French)",
          options: {
            source: (doc: any) => doc.title?.fr || "",
          },
        }),
        defineField({
          name: "en",
          type: "slug",
          title: "Slug (English)",
          options: {
            source: (doc: any) => doc.title?.en || "",
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      subtitle: `title.${baseLanguage?.id}`,
    },
  },
})
