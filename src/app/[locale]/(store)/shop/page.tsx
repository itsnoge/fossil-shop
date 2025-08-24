import { useTranslations } from "next-intl"

export default function Shop() {
  const tSection = useTranslations("Sections")
  const tBrand = useTranslations("Metadata.shop")
  return (
    <div className="font-sans lg:container lg:mx-auto">
      <div className="mb-10">
        <h1 className="font-figtree mb-10 text-4xl font-semibold md:text-7xl">
          {tSection("shop")}
        </h1>
        <p className="max-w-md font-sans font-medium">{tBrand("description")}</p>
      </div>
      <div></div>
    </div>
  )
}
