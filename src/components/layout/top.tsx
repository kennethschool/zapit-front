"use client"
import { useState, useEffect } from "react"

const TopNav = () => {
  const [isAtTop, setIsAtTop] = useState(true)
  const [backgroundOut, setBackgroundOut] = useState(1)

  useEffect(() => {
    setIsAtTop(window.scrollY === 0)
    
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0)
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, []);

  return (
    <div className="items-center justify-center flex">
      <div className={`h-fit bg-yellow-400 z-40 mt-0 items-center transform transition-all w-full ${isAtTop ? "": "fixed translate-y-8 rounded-lg p-2 border-b-8 border-yellow-500 "} flex gap-8 justify-center`}>
        <div className="mt-1 text-white font-semibold">Zapit</div>
      </div>
    </div>
  )
}


export default TopNav