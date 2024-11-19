"use client"
import { FormEvent, useState } from "react"
import Input from "./Input"
import { getProductById } from "@/lib/products"
import { useUserContext } from "@/context/userContext"
import { useToast } from "@/hooks/use-toast"

export default function Form() {
  const { addItem } = useUserContext()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<"cantidad" | "id" | "">("")
  const { toast } = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    const formData = new FormData(event.target as HTMLFormElement)

    const cantidad = formData.get("cantidad")
    const itemId = formData.get("itemId")?.toString()

    if (!cantidad || +cantidad < 1) {
      setError("cantidad")
      setIsLoading(false)
      return
    }
    if (!itemId || +itemId < 1 || +itemId > 20) {
      setError("id")
      setIsLoading(false)
      return
    }

    const { error, product } = await getProductById(itemId)

    if (error) {
      toast({
        title: `${error ? error : "Ups, algo salio mal"}`,
        duration: 3000,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (product) {
      const addedItem = addItem({
        id: +product.id,
        title: product.title,
        imageUrl: product.image,
        price: +product.price,
        cantidad: +cantidad,
      })

      if (addedItem)
        toast({
          title: "Item agregado ✔️",
          className: "border-2 border-green-600",
          duration: 3000,
        })
    }
    setIsLoading(false)
  }

  return (
    <form
      className="grid px-2 sm:grid-cols-[106px_1fr_100px] sm:px-0 gap-2 mt-2"
      onSubmit={handleSubmit}
    >
      <Input error={error} />

      <button
        type="submit"
        className="border-2 bg-blue-600 border-blue-600 rounded-lg hover:bg-blue-800 transition-colors h-[44px] self-end"
        disabled={isLoading}
        style={isLoading ? { opacity: 0.6 } : {}}
      >
        {isLoading ? "..." : "Agregar"}
      </button>
    </form>
  )
}
