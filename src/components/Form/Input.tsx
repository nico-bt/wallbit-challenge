"use client"
import { useDebouncedCallback } from "use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function Input() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace, push } = useRouter()
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
        />
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
        />
      </div>
    </>
  )
}
