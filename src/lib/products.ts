type ProductType = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

type DataResponse = {
  error: string | null
  product: ProductType | null
}

export async function getProductById(id: number | string): Promise<DataResponse> {
  const itemId = Number(id)

  if (Number.isNaN(itemId) || itemId > 20 || itemId < 1) {
    return { error: "id debe ser un numero entre 1 y 20", product: null }
  }

  try {
    const res = await fetch("https://fakestoreapi.com/products/" + id)

    if (!res.ok) {
      throw new Error("Ups, algo salió mal")
    }
    const product = await res.json()

    return { error: null, product }
  } catch (error: any) {
    return { error: error?.message || "Ups, algo salió mal", product: null }
  }
}
