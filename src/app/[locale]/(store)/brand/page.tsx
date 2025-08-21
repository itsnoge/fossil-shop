import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" })

  return {
    title: t("brand.title"),
    description: t("brand.description"),
  }
}

export default function Brand() {
  return <div>Brand Page</div>
}
