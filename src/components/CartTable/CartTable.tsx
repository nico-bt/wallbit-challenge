"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DeleteRow from "./DeleteRow"
import { useUserContext } from "@/context/userContext"

export default function CartTable() {
  const { user } = useUserContext()
  const cart = user.cart

  if (!cart || !cart.length)
    return (
      <div className="mt-24 text-lg text-center">
        <span className="text-3xl">🛒</span> Sin items agregados
      </div>
    )

  let totalAmount = 0
  cart.forEach((item) => (totalAmount += item.price * item.cantidad))

  return (
    <Table className="mt-6">
      <TableCaption>Carrito creado {user.date.toLocaleString()}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cant</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Foto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((item) => (
          <TableRow key={item.id} className="relative">
            <TableCell className="font-medium text-center">{item.cantidad}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              {item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </TableCell>
            <TableCell className="text-right">
              {(item.price * item.cantidad).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
            <TableCell className="flex items-center">
              <img
                src={item.imageUrl}
                height={60}
                className="max-h-[70px] max-w-[80px] mx-auto object-contain"
                alt="Product image"
              />
            </TableCell>

            <DeleteRow itemId={item.id} />
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-center text-base">
            {totalAmount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
