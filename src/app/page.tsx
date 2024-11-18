import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Suspense } from "react"

type SearchParams = Promise<{ query: string | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <div className="grid grid-rows-[60px_1fr_auto] justify-items-center min-h-screen gap-10 pb-6">
      <Header />

      <main className="flex flex-col gap-2 row-start-2 p-2 pt-0 w-full max-w-[800px] min-w-0">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="h-[120px]"></div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
