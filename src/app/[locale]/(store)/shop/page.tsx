import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" })
  return {
    title: t("shop.title"),
    description: t("shop.description"),
  }
}

export default function Shop() {
  return <div>Shop Page</div>
}
