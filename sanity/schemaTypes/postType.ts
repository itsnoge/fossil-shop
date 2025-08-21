import { DocumentTextIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"
import { baseLanguage } from "./localeStringType"

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
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
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "object",
      fields: [
        defineField({ name: "en", type: "blockContent", title: "English content" }),
        defineField({ name: "fr", type: "blockContent", title: "French content" }),
      ],
    }),
  ],
  preview: {
    select: {
      titleObj: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { titleObj, author, media } = selection
      const lang = baseLanguage?.id || "en"
      const title = (titleObj && titleObj[lang]) || "Untitled"
      return {
        title,
        subtitle: author ? `by ${author}` : "",
        media,
      }
    },
  },
})
