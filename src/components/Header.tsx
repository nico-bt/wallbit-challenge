"use client"
import Image from "next/image"
import wallbitLogo from "../../public/logo-wallbit-fe8a4ef0.svg"
import { useUserContext } from "@/context/userContext"

function Header() {
  const { user } = useUserContext()

  return (
    <header className="bg-white w-full text-black row-start-1 flex gap-6 flex-wrap items-center justify-center">
      <Image src={wallbitLogo} alt="Wallbit logo" />
      <div className="text-base font-semibold px-2 py-1 bg-green-100 border border-gray-400 rounded-lg">
        {user?.money.toLocaleString("en-US", { style: "currency", currency: "USD" })} 💰
      </div>
    </header>
  )
}

export default Header
