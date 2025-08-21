import { CubeIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"
import { baseLanguage } from "./localeStringType"

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: CubeIcon,
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
      name: "hoverImage",
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
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "productCategory" } })],
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "object",
      fields: [
        defineField({ name: "active", type: "boolean", title: "Active" }),
        defineField({
          name: "percentage",
          type: "number",
          title: "Discount %",
          validation: (rule) => rule.required().min(0).max(100),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      titleObj: "title",
      media: "mainImage",
      price: "price",
    },
    prepare(selection) {
      const { titleObj, media, price } = selection
      const lang = baseLanguage?.id || "en"
      const title = (titleObj && titleObj[lang]) || "Untitled"

      const subtitle =
        typeof price === "number"
          ? `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : ""

      return { title, subtitle, media }
    },
  },
})
