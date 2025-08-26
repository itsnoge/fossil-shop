import FavoritesList from "@/components/favorites-list"
import { getTranslations } from "next-intl/server"

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Favorites({ params }: Props) {
  const { locale } = await params
  const tSection = await getTranslations("Sections")
  const tBrand = await getTranslations("Metadata.favorites")

  return (
    <div className="font-sans lg:container lg:mx-auto">
      <div className="mb-20">
        <h1 className="font-figtree mb-10 text-4xl font-semibold md:text-7xl">
          {tSection("favorites")}
        </h1>
        <p className="max-w-md font-sans font-medium">{tBrand("description")}</p>
      </div>

      <FavoritesList locale={locale} />
    </div>
  )
}
