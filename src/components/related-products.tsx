import ProductCard from "@/components/product-card"
import { client } from "@/sanity/lib/client"
import { GET_CATEGORY_BY_SLUG, GET_PRODUCTS_BY_CATEGORY } from "@/sanity/lib/queries"
import { GET_PRODUCTS_RESULT, GET_CATEGORIES_RESULT } from "@/sanity/lib/types"
import { getTranslations } from "next-intl/server"

type RelatedProductsProps = {
  categorySlug: string
  currentProductSlug: string
  locale: string
}

export default async function RelatedProducts({
  categorySlug,
  currentProductSlug,
  locale,
}: RelatedProductsProps) {
  const tLabels = await getTranslations("Labels")

  const category = await client.fetch<GET_CATEGORIES_RESULT>(GET_CATEGORY_BY_SLUG, {
    slug: categorySlug,
    locale,
  })
  if (!category?._id) return null

  const products = await client.fetch<GET_PRODUCTS_RESULT[]>(GET_PRODUCTS_BY_CATEGORY, {
    categoryId: category._id,
    locale,
  })

  const relatedProducts = products.filter((p) => p.slug !== currentProductSlug).slice(0, 3)

  if (relatedProducts.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="mb-5 font-sans text-xl font-medium">{tLabels("product related")}</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  )
}
