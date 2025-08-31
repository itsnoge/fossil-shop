import Footer from "@/components/footer"
import Header from "@/components/header"

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-32 lg:px-8">{children}</main>
      <Footer />
    </div>
  )
}
