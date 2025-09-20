import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import { GET_PRODUCT_BY_SLUG } from "@/sanity/lib/queries"
import { GET_PRODUCT_BY_SLUG_RESULT } from "@/sanity/lib/types"
import ProductDisplay from "@/components/product-display"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "@/i18n/navigation"
import RelatedProducts from "@/components/related-products"
import { Metadata } from "next"
import { DESCRIPTION, TITLE } from "@/constants"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params

  const product = await client.fetch<GET_PRODUCT_BY_SLUG_RESULT>(GET_PRODUCT_BY_SLUG, {
    slug,
    locale,
  })

  if (!product) {
    return {
      title: TITLE,
      description: DESCRIPTION,
    }
  }

  return {
    title: `${product.title} | ${TITLE}`,
    description: DESCRIPTION,
    icons: {
      icon: "/logo-symbol.svg",
      shortcut: "/logo-symbol.svg",
    },
  }
}

export default async function ProductDetails({ params }: Props) {
  const { locale, slug } = await params

  const product = await client.fetch<GET_PRODUCT_BY_SLUG_RESULT>(GET_PRODUCT_BY_SLUG, {
    slug,
    locale,
  })

  if (!product) return notFound()

  const category = product.categories?.[0] || null

  return (
    <div>
      <div className="pb-20">
        <Breadcrumb className="mb-4 font-sans">
          <BreadcrumbList>
            <BreadcrumbItem className="text-xs uppercase">
              <BreadcrumbLink asChild>
                <Link href="/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-xs uppercase">
                  <BreadcrumbLink asChild>
                    <Link href={`/shop/categories/${category.slug}`}>{category.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-xs uppercase">
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductDisplay product={product} locale={locale} />
      </div>
      <div className="pt-20">
        {product.categories?.[0]?.slug && (
          <RelatedProducts
            categorySlug={product.categories[0].slug}
            currentProductSlug={product.slug}
            locale={locale}
          />
        )}
      </div>
    </div>
  )
}
