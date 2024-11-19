"use client"
import { useToast } from "@/hooks/use-toast"
import { useContext, useEffect, createContext, useState, ReactNode } from "react"

export type CartItem = {
  id: number
  title: string
  imageUrl: string
  price: number
  cantidad: number
}

export type User = {
  money: number
  cart: CartItem[]
  date: Date
}

const initialState: User = {
  money: 1000,
  cart: [],
  date: new Date(),
}

type UserContextType = {
  user: User
  addItem: (item: CartItem) => CartItem | void
  removeItem: (id: number) => void
}

const UserContext = createContext<UserContextType>({
  user: initialState,
  addItem: () => {},
  removeItem: () => {},
})

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialState)
  const { toast } = useToast()

  const getUserInLocalStorage = () => {
    const userInLocal = localStorage.getItem("user")

    if (userInLocal) {
      const data = JSON.parse(userInLocal)

      const parsedData = {
        money: Number(data.money),
        cart: data.cart.map((item: any) => ({
          id: Number(item.id),
          title: item.title,
          imageUrl: item.imageUrl,
          price: Number(item.price),
          cantidad: Number(item.cantidad),
        })),
        date: new Date(data.date),
      }
      setUser(parsedData)
    }
  }

  useEffect(() => {
    getUserInLocalStorage()
  }, [])

  // Add item to Cart
  //--------------------------------------------
  const addItem = (newItem: CartItem) => {
    // Primero vemos si alcanza la plata
    if (user.money - newItem.price * newItem.cantidad < 0) {
      toast({
        title: "Fondos insuficientes",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    // Antes de agregar veo si ya está el item en el cart
    const productInCartIndex = user.cart.findIndex((item) => item.id === newItem.id)

    let newCart
    // Si el producto ya está en el cart, le sumamos +cant
    if (productInCartIndex >= 0) {
      newCart = user.cart.map((cartItem) => {
        if (cartItem.id === newItem.id) {
          return { ...cartItem, cantidad: cartItem.cantidad + newItem.cantidad }
        } else {
          return cartItem
        }
      })
    } else {
      // Si no está en el cart lo agregamos
      // (adelante así muestra por defecto el último agregado primero)
      newCart = [{ ...newItem }, ...user.cart]
    }

    const money = user.money - newItem.price * newItem.cantidad

    const date = user.cart.length === 0 ? new Date() : user.date

    setUser({ money, cart: newCart, date })
    localStorage.setItem("user", JSON.stringify({ money, cart: newCart, date }))
    return newItem
  }

  // Remove from Cart
  //--------------------------------------------
  const removeItem = (itemId: number) => {
    let moneyBack = 0

    const newCart = user.cart.filter((item) => {
      if (item.id === itemId) {
        moneyBack = item.price * item.cantidad
        return false
      }
      return true
    })

    setUser({ money: user.money + moneyBack, cart: newCart, date: user.date })

    localStorage.setItem(
      "user",
      JSON.stringify({ money: user.money + moneyBack, cart: newCart, date: user.date })
    )
  }

  return (
    <UserContext.Provider
      value={{
        user,
        addItem,
        removeItem,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Wrapper para usar en layout
export function UserProviderWrapper({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}

// Hook to use the context
const useUserContext = () => {
  return useContext(UserContext)
}

export { UserProvider, useUserContext }
