"use client"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import wallbitLogo from "../../public/logo-wallbit-fe8a4ef0.svg"
import Image from "next/image"

export default function FirstLoadMsg() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited")

    if (!hasVisited) {
      setIsFirstVisit(true)
      localStorage.setItem("hasVisited", "true")
    }
  }, [])

  if (!isFirstVisit) return null

  return (
    <Dialog defaultOpen={isFirstVisit}>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle className="text-4xl text-black mb-2 border-b-2 border-gray-300 pb-2">
            🚀 Felicidades!!!
          </DialogTitle>
          <DialogDescription className="text-base text-black grid">
            <span className="flex flex-wrap gap-[6px]">
              Sos el usuario número 20.000 de
              <Image src={wallbitLogo} height={20} alt="Wallbit logo" />
            </span>
          </DialogDescription>
        </DialogHeader>
        <p className="text-black">Como premio te regalamos 1.000 usd para que uses en el Market </p>
        <DialogFooter>
          <button
            className="text-3xl py-2 px-3 border-2 bg-blue-600 border-blue-600 rounded-lg hover:bg-blue-800 transition-colors"
            type="submit"
            onClick={() => setIsFirstVisit(false)}
          >
            👍🏻
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
