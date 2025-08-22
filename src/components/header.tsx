"use client"

import LocaleSwitcher from "@/components/locale-switcher"
import { Link } from "@/i18n/navigation"
import { CircleUserRound, Heart, Search, ShoppingBag, X } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "@/components/nav-link"
import { navigations, rightNavigations, socialLinks } from "@/constants/links"

export default function Header() {
  const t = useTranslations("Navigation")
  const tSections = useTranslations("Sections")
  const pathname = usePathname()
  const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "")

  const sortedNavigations = [...navigations, ...rightNavigations].sort(
    (a, b) => b.href.length - a.href.length,
  )

  const activeNav = sortedNavigations.find(
    (nav) => pathWithoutLocale === nav.href || pathWithoutLocale.startsWith(nav.href + "/"),
  )

  return (
    <header className="border-b px-4 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <nav className="hidden flex-1 items-center gap-6 font-sans lg:flex">
          {navigations.map((nav) => {
            const isActive = activeNav?.href === nav.href
            return (
              <NavLink
                key={nav.href}
                href={nav.href}
                isActive={isActive}
                dotPosition="left"
                label={t(nav.label)}
                className="text-sm font-medium"
                direction="up"
                speed="slow"
              />
            )
          })}
        </nav>

        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-full.svg"
            alt="Fossil"
            className="h-auto w-16 dark:invert"
            width={80}
            height={80}
            priority
          />
        </Link>

        <div className="flex h-5 flex-1 items-center justify-end gap-5">
          <Link href="/login">
            <Button size="icon" variant="ghost">
              <CircleUserRound className="size-4" />
            </Button>
          </Link>

          <Separator orientation="vertical" />

          <div className="-mr-2 flex items-center gap-2">
            <Link href="/favorites">
              <Button size="icon" variant="ghost" className="hidden lg:inline-flex">
                <Heart className="size-4" />
              </Button>
            </Link>
            <Button size="icon" variant="ghost">
              <Search className="size-4" />
            </Button>
            <div className="hidden lg:block">
              <LocaleSwitcher />
            </div>
            <Button size="sm" variant="ghost">
              <ShoppingBag className="size-4" />
              <span className="font-mono">(0)</span>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="group size-8 lg:hidden" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-full">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <div className="flex h-5 items-center gap-2">
                      <p className="mr-2 font-sans font-medium">Menu</p>
                      <Separator orientation="vertical" />
                      <div className="flex items-center gap-2">
                        <div className="">
                          <LocaleSwitcher />
                        </div>
                        <SheetClose asChild>
                          <Link href="/favorites">
                            <Button size="icon" variant="ghost">
                              <Heart className="size-4" />
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Button size="icon" variant="ghost">
                        <X className="size-4" />
                      </Button>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4">
                  <nav className="mb-16 flex flex-col gap-2">
                    <p className="mb-2 font-sans text-xs font-medium uppercase">
                      ({tSections("navigate")})
                    </p>
                    {navigations.map((nav) => {
                      const isActive = activeNav?.href === nav.href
                      return (
                        <SheetClose key={nav.href} asChild>
                          <NavLink
                            href={nav.href}
                            isActive={isActive}
                            dotPosition="right"
                            label={t(nav.label)}
                            className="text-xl font-medium"
                            direction="up"
                            speed="slow"
                          />
                        </SheetClose>
                      )
                    })}
                  </nav>
                  <div className="grid grid-cols-2">
                    <nav className="flex flex-col gap-2">
                      <p className="mb-2 font-sans text-xs font-medium uppercase">
                        ({tSections("customer care")})
                      </p>
                      {rightNavigations.map((nav) => {
                        const isActive = activeNav?.href === nav.href
                        return (
                          <SheetClose key={nav.href} asChild>
                            <NavLink
                              href={nav.href}
                              isActive={isActive}
                              dotPosition="right"
                              label={t(nav.label)}
                              className="text-sm font-medium"
                              direction="up"
                              speed="slow"
                            />
                          </SheetClose>
                        )
                      })}
                    </nav>
                    <div className="flex flex-col gap-2">
                      <p className="mb-2 font-sans text-xs font-medium uppercase">
                        ({tSections("follow us")})
                      </p>
                      {socialLinks.map((nav) => {
                        return (
                          <SheetClose key={nav.href} asChild>
                            <NavLink
                              href={nav.href}
                              dotPosition="none"
                              label={nav.label}
                              className="text-sm font-medium"
                              direction="up"
                              speed="slow"
                              external
                            />
                          </SheetClose>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
