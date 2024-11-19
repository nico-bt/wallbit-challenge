"use client"
import { useToast } from "@/hooks/use-toast"
import { TableCell } from "../ui/table"
import { useUserContext } from "@/context/userContext"

export default function DeleteRow({ itemId }: { itemId: number }) {
  const { removeItem } = useUserContext()
  const { toast } = useToast()

  const handleDelete = async (id: number) => {
    removeItem(id)
    toast({
      title: "Item eliminado",
      variant: "destructive",
      duration: 3000,
    })
  }

  return (
    <TableCell className="absolute left-0 top-0 right-0 bottom-0 opacity-0 hover:opacity-100 flex items-center">
      <span
        className="bg-red-600 p-2 cursor-pointer text-white rounded-md"
        onClick={() => handleDelete(itemId)}
      >
        {/* Delete Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </span>
    </TableCell>
  )
}
