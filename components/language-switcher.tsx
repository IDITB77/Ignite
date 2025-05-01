"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/components/language-provider"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, languages } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-[8px] flex items-center justify-center text-primary-foreground font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
          >
            {currentLanguage.toUpperCase()}
          </motion.div>
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, language]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as any)}
            className={currentLanguage === code ? "bg-primary/10 text-primary" : ""}
          >
            <span className="mr-2">{code === "en" ? "🇬🇧" : code === "hi" ? "🇮🇳" : code === "ta" ? "🇮🇳" : "🇮🇳"}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
