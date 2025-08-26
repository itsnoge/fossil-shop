import ShopHeader from "@/components/shop-header"
import { client } from "@/sanity/lib/client"
import { GET_CATEGORIES } from "@/sanity/lib/queries"
import { GET_CATEGORIES_RESULT } from "@/sanity/lib/types"
import { getTranslations } from "next-intl/server"

type Props = {
  params: { locale: string }
  children: React.ReactNode
}

export default async function ProductLayout({ children, params }: Props) {
  const locale = params
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
      <main className="font-sans lg:container lg:mx-auto">
        <div className="mt-5 grid grid-cols-1 gap-3 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </main>
    </>
  )
}
