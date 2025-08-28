"use client"

import LocaleSwitcher from "@/components/locale-switcher"
import { Link } from "@/i18n/navigation"
import { AlignJustify, CircleUserRound, Heart, X } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "@/components/nav-link"
import { navigations, rightNavigations, socialLinks } from "@/constants/links"
import Cart from "@/components/cart"

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
    <header className="fixed top-0 left-0 z-40 w-full border-b bg-white px-4 lg:px-8">
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
                className="pr-1 text-sm font-medium"
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

        <div className="flex h-5 flex-1 items-center justify-end gap-2">
          <Link href="/login">
            <Button size="icon" variant="ghost">
              <CircleUserRound className="size-4" />
            </Button>
          </Link>

          <Separator orientation="vertical" />

          <div className="-mr-4 flex items-center gap-1">
            <Link href="/favorites">
              <Button size="icon" variant="ghost">
                <Heart className="size-4" />
              </Button>
            </Link>
            <LocaleSwitcher />
            <Cart />

            <Sheet>
              <SheetTrigger asChild>
                <Button className="group size-8 lg:hidden" variant="ghost" size="icon">
                  <AlignJustify />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-full">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <p className="mr-2 font-sans font-medium">Menu</p>
                    <SheetClose asChild>
                      <Button size="icon" variant="ghost">
                        <X className="size-4" />
                      </Button>
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <div className="hidden">
                  <SheetDescription></SheetDescription>
                </div>

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
