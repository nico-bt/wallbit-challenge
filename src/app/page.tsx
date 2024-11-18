import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { Suspense } from "react"
import Form from "@/components/Form/Form"
import { getProductById } from "@/lib/products"

type SearchParams = Promise<{ query: string | undefined }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""

  return (
    <div className="grid grid-rows-[60px_1fr_auto] justify-items-center min-h-screen gap-10 pb-6">
      <Header />

      <main className="flex flex-col gap-2 row-start-2 p-2 pt-0 w-full max-w-[800px] min-w-0">
        <div className="w-full max-w-[600px] mx-auto">
          <div className="h-[120px]">
            <Suspense
              key={query}
              fallback={<div className="h-full grid place-items-center">Loading...</div>}
            >
              <PreviewItemById itemId={query} />
            </Suspense>
          </div>

          <Form />
        </div>
      </main>

      <Footer />
    </div>
  )
}

async function PreviewItemById({ itemId }: { itemId: string }) {
  if (!itemId) return null

  const { product, error } = await getProductById(itemId)

  if (error) {
    return (
      <div className="min-h-[96px] flex items-center justify-center text-lg text-red-600">
        {error}
      </div>
    )
  }

  if (product) {
    return (
      <div className="w-full grid grid-cols-[106px_1fr] gap-3 items-center border border-gray-300 rounded-lg p-2">
        <img
          src={product.image}
          alt={product.title}
          height={96}
          className="rounded-lg h-24 object-contain mx-auto px-1"
        />
        <div>
          <p className="text-2xl mb-1">$ {product.price}</p>
          <p>{product.title}</p>
        </div>
      </div>
    )
  }
}
