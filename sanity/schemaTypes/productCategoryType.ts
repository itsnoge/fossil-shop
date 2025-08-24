import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"
import { baseLanguage } from "./localeStringType"

export const productCategoryType = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug (global)",
      options: {
        source: (doc: any) => doc.title?.en || "",
      },
    }),
  ],
  preview: {
    select: {
      title: `title.${baseLanguage?.id}`,
      subtitle: `slug.${baseLanguage?.id}.current`,
    },
  },
})
