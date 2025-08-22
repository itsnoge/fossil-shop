import { NavLink } from "@/components/nav-link"
import { navigations, rightNavigations, socialLinks } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Footer() {
  const t = useTranslations("Navigation")
  const tSections = useTranslations("Sections")
  return (
    <footer className="bg-black px-4 pt-20 pb-8 text-white lg:px-8">
      <div className="items-center justify-between lg:flex">
        <div className="mb-10">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-full.svg"
              alt="Fossil"
              className="h-auto w-96 invert"
              width={80}
              height={80}
              priority
            />
          </Link>
        </div>
        <div className="grid max-w-2xl grid-cols-2 gap-12 lg:grid-cols-3">
          <nav className="flex flex-col gap-2">
            <p className="mb-2 font-sans text-xs font-medium uppercase">
              ({tSections("navigate")})
            </p>
            {navigations.map((nav) => {
              return (
                <NavLink
                  key={nav.href}
                  href={nav.href}
                  dotPosition="right"
                  label={t(nav.label)}
                  className="text-sm font-medium"
                  direction="up"
                  speed="slow"
                />
              )
            })}
          </nav>
          <nav className="flex flex-col gap-2">
            <p className="mb-2 font-sans text-xs font-medium uppercase">
              ({tSections("customer care")})
            </p>
            {rightNavigations.map((nav) => {
              return (
                <NavLink
                  key={nav.href}
                  href={nav.href}
                  dotPosition="right"
                  label={t(nav.label)}
                  className="text-sm font-medium"
                  direction="up"
                  speed="slow"
                />
              )
            })}
          </nav>
          <div className="flex flex-col gap-2">
            <p className="mb-2 font-sans text-xs font-medium uppercase">
              ({tSections("follow us")})
            </p>
            {socialLinks.map((nav) => {
              return (
                <NavLink
                  key={nav.href}
                  href={nav.href}
                  dotPosition="none"
                  label={nav.label}
                  className="text-sm font-medium"
                  direction="up"
                  speed="slow"
                  external
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 font-sans text-xs text-white md:flex-row md:items-center md:justify-between">
        <p>fossil. © 2025 All rights reserved.</p>
        <Link
          href="https://itsnoge.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="tracking-wider text-white uppercase"
        >
          by NOGE © 2025
        </Link>
      </div>
    </footer>
  )
}
