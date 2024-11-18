import type { Metadata } from "next"
import "./globals.css"
import { Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import FirstLoadMsg from "@/components/FirstLoadMsg"

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Wallbit market",
  description: "Cuenta en EE.UU. desde LATAM",
  creator: "Nico Battaglia",
  keywords: ["wallbit", "market", "usd", "cuenta usa", "fintech"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Toaster />
        <FirstLoadMsg />
      </body>
    </html>
  )
}
