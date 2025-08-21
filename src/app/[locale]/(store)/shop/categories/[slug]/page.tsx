import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" })

  const title = t(`categories.${params.slug}.title`)
  const description = t(`categories.${params.slug}.description`)

  return {
    title,
    description,
  }
}

export default function Category() {
  return <div>Category page</div>
}
