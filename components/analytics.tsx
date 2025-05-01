"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is a mock analytics implementation
    // In a real app, you would use a service like Google Analytics, Plausible, etc.
    const url = `${pathname}${searchParams ? `?${searchParams}` : ""}`
    console.log(`📊 Page view: ${url}`)
  }, [pathname, searchParams])

  return null
}
