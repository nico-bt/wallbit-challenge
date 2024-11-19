// Input itemId se pone en sync con query params
// Y despues en "/" homepage, agarro ese query para buscar automaticamente el producto al tipear
// y mostrarlo en preview

"use client"
import { useDebouncedCallback } from "use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Input({ error }: { error: "cantidad" | "id" | "" }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const WAITING_TIME_DEBOUNCE = 300

  const handleInputChange = useDebouncedCallback(async (input: string) => {
    const params = new URLSearchParams(searchParams)
    if (input) {
      params.set("query", input)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, WAITING_TIME_DEBOUNCE)

  return (
    <>
      <div className="flex flex-col relative">
        <label htmlFor="cantidad" className="text-sm pl-1 text-blue-50">
          Cantidad
        </label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          placeholder="cantidad"
          className="bg-white rounded-lg p-2 border text-black focus:outline-blue-600"
          defaultValue={1}
          style={error === "cantidad" ? { border: "red 3px solid" } : {}}
        />
        {error === "cantidad" && (
          <span className="text-sm text-red-600 pl-2 sm:absolute sm:-bottom-6">Mayor a 1</span>
        )}
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="itemId" className="text-sm pl-1 text-blue-50">
          Id
        </label>
        <input
          type="number"
          name="itemId"
          id="itemId"
          placeholder="Ingresar Id entre 1 y 20"
          className="bg-white rounded-lg p-2 border text-black focus:outline-blue-600"
          // onChange={(e) => handleInputChange(e.target.value)} este no hace preview dos veces seguidas del mismo elemento
          onInput={(e) => handleInputChange((e.target as HTMLInputElement).value)}
          defaultValue={Number(searchParams?.get("query")) || undefined}
          autoFocus
          style={error === "id" ? { border: "red 3px solid" } : {}}
        />
        {error === "id" && (
          <span className="text-sm text-red-600 pl-2 sm:absolute sm:-bottom-6">Entre 1 y 20</span>
        )}
      </div>
    </>
  )
}
