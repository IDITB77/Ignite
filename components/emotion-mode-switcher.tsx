"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEmotion, emotionModes } from "@/components/emotion-provider"
import { Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function EmotionModeSwitcher() {
  const { currentMode, setMode, autoDetectMode, setAutoDetectMode } = useEmotion()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-background border-2 border-primary text-[8px] flex items-center justify-center text-primary font-bold"
            initial={{ scale: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {emotionModes[currentMode].icon}
          </motion.div>
          <span className="sr-only">Switch emotion mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(emotionModes).map(([mode, details]) => (
          <DropdownMenuItem
            key={mode}
            onClick={() => setMode(mode as any)}
            className={currentMode === mode ? "bg-primary/10 text-primary" : ""}
          >
            <span className="mr-2">{details.icon}</span>
            {details.name}
            <span className="ml-2 text-xs text-muted-foreground">{details.description}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="p-2 flex items-center justify-between">
          <Label htmlFor="auto-detect" className="text-sm cursor-pointer">
            Auto-detect from mood
          </Label>
          <Switch id="auto-detect" checked={autoDetectMode} onCheckedChange={setAutoDetectMode} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
