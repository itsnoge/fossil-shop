import ProductCard from "@/components/product-card"
import { client } from "@/sanity/lib/client"
import { GET_PRODUCTS } from "@/sanity/lib/queries"
import { GET_PRODUCTS_RESULT } from "@/sanity/lib/types"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Shop({ params }: Props) {
  const { locale } = await params

  const products = await client.fetch<GET_PRODUCTS_RESULT[]>(GET_PRODUCTS, { locale })

  if (!products || products.length === 0) return notFound()

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </>
  )
}
