import Footer from "@/components/footer"
import Header from "@/components/header"

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-4 py-20 lg:px-8">{children}</main>
      <Footer />
    </>
  )
}
