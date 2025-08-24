import ProductCard from "@/components/product-card"
import { client } from "@/sanity/lib/client"
import { GET_CATEGORY_BY_SLUG, GET_PRODUCTS_BY_CATEGORY } from "@/sanity/lib/queries"
import { GET_CATEGORIES_RESULT, GET_PRODUCTS_RESULT } from "@/sanity/lib/types"
import { notFound } from "next/navigation"

type Props = {
  params: { locale: string; slug: string }
}

export default async function Category({ params }: Props) {
  const { locale, slug } = params

  const category = await client.fetch<GET_CATEGORIES_RESULT>(GET_CATEGORY_BY_SLUG, {
    slug,
    locale,
  })

  if (!category) return notFound()

  const products = await client.fetch<GET_PRODUCTS_RESULT[]>(GET_PRODUCTS_BY_CATEGORY, {
    categoryId: category._id,
    locale,
  })

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </>
  )
}
