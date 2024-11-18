import Image from "next/image"
import wallbitLogo from "../../public/logo-wallbit-fe8a4ef0.svg"

function Header() {
  return (
    <header className="bg-white w-full text-black row-start-1 flex gap-6 flex-wrap items-center justify-center">
      <Image src={wallbitLogo} alt="Wallbit logo" />
    </header>
  )
}

export default Header
