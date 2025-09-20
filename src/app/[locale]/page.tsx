import { RollingText } from "@/components/ui/rolling-text"
import { navigations } from "@/constants"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import TimeDisplay from "@/components/time-display"

type Props = {
  params: Promise<{ locale: string }>
}
export default async function Home({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations("Navigation")

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="/home.mp4"
        autoPlay
        loop
        muted
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          src="/logo-full.svg"
          alt="Fossil"
          className="mb-12 h-auto w-20 invert"
          width={80}
          height={80}
        />

        <nav className="flex flex-col items-center justify-center space-y-3 font-sans">
          {navigations.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className="group relative flex items-center text-sm text-white"
            >
              <span className="absolute -left-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                •
              </span>
              <RollingText text={t(nav.label)} direction="up" speed="slow" />
            </Link>
          ))}
        </nav>
      </div>

      <TimeDisplay locale={locale} />
    </div>
  )
}
