import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Brand() {
  const tSection = useTranslations("Sections")
  const tBrand = useTranslations("Metadata.brand")

  return (
    <div className="font-sans lg:container lg:mx-auto">
      <h1 className="font-figtree mb-10 text-4xl font-semibold md:text-7xl">{tSection("brand")}</h1>

      <div className="mb-32 flex flex-col font-sans md:flex-row md:items-end md:gap-8">
        <div className="md:w-1/2">
          <Image
            src="/brand-founder.avif"
            alt="Fondateur de Fossil"
            width={500}
            height={500}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-6 md:mt-0 md:w-1/2">
          <h4 className="mb-4 text-xs font-semibold">({tBrand("sections.meet.title")})</h4>
          <p className="font-medium md:text-lg">{tBrand("sections.meet.text")}</p>
        </div>
      </div>

      <div className="py-32 text-center">
        <p className="text-7xl font-semibold">({tBrand("sections.based.title")})</p>
        <p className="text-7xl font-semibold">{tBrand("sections.based.location")}</p>
      </div>

      <div className="grid grid-cols-1 gap-10 py-32 lg:grid-cols-3">
        <div className="col-span-full lg:col-span-1">
          <h4 className="text-xl font-semibold">{tBrand("sections.commitment.title")}</h4>
          <div className="grid grid-cols-1 gap-10 pt-6 text-sm font-medium lg:grid-cols-2">
            <p>{tBrand("sections.commitment.text1")}</p>
            <p>{tBrand("sections.commitment.text2")}</p>
          </div>
        </div>

        <div className="col-span-full flex flex-col gap-2 md:flex-row lg:col-span-2">
          <div className="w-full">
            <Image
              src="/brand-ireland.webp"
              alt="ireland"
              width={500}
              height={500}
              className="h-auto w-full object-cover"
            />
            <p className="mt-2 text-xs font-medium">(Sourced from Ireland)</p>
          </div>
          <div className="w-full">
            <Image
              src="/brand-cotton.avif"
              alt="cotton"
              width={500}
              height={500}
              className="h-auto w-full object-cover"
            />
            <p className="mt-2 text-xs font-medium">(Pima Cotton)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
