import ProductCard from "@/components/product-card"
import ShopHeader from "@/components/shop-header"
import { client } from "@/sanity/lib/client"
import { GET_CATEGORIES, GET_PRODUCTS } from "@/sanity/lib/queries"
import { GET_CATEGORIES_RESULT, GET_PRODUCTS_RESULT } from "@/sanity/lib/types"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Shop({ params }: Props) {
  const { locale } = await params

  const products = await client.fetch<GET_PRODUCTS_RESULT[]>(GET_PRODUCTS, { locale })

  if (!products || products.length === 0) return notFound()
  const tSection = await getTranslations("Sections")
  const tBrand = await getTranslations("Metadata.shop")

  const categories = await client.fetch<GET_CATEGORIES_RESULT[]>(GET_CATEGORIES, { locale })

  return (
    <>
      <ShopHeader
        title={tSection("shop")}
        description={tBrand("description")}
        categories={categories}
      />
      <div className="mt-5 grid grid-cols-1 gap-3 gap-y-10 font-sans md:grid-cols-2 lg:container lg:mx-auto lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </>
  )
}
