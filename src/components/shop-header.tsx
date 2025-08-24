import ShopCategory from "@/components/shop-category"
import { GET_CATEGORIES_RESULT } from "@/sanity/lib/types"

type ShopSectionProps = {
  title: string
  description: string
  categories: GET_CATEGORIES_RESULT[]
}

export default function ShopHeader({ title, description, categories }: ShopSectionProps) {
  return (
    <div className="font-sans lg:container lg:mx-auto">
      <div className="mb-20">
        <h1 className="font-figtree mb-10 text-4xl font-semibold md:text-7xl">{title}</h1>
        <p className="max-w-md font-sans font-medium">{description}</p>
      </div>
      <ShopCategory categories={categories} />
    </div>
  )
}
