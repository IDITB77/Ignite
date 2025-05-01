"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EmotionModeSwitcher } from "@/components/emotion-mode-switcher"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Book,
  Brain,
  Flame,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Rocket,
  Settings,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("nav.home"), path: "/", icon: <Flame className="h-4 w-4" /> },
    { name: t("nav.dashboard"), path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: t("nav.journal"), path: "/journal", icon: <Book className="h-4 w-4" /> },
    { name: t("nav.skills"), path: "/skills", icon: <Trophy className="h-4 w-4" /> },
    { name: t("nav.incubation"), path: "/incubation", icon: <MessageSquare className="h-4 w-4" /> },
    { name: t("nav.teams"), path: "/teams", icon: <Users className="h-4 w-4" /> },
    { name: t("nav.missions"), path: "/missions", icon: <Rocket className="h-4 w-4" /> },
    { name: t("nav.mentor"), path: "/mentor", icon: <Brain className="h-4 w-4" /> },
  ]

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case "happy":
        return "😊"
      case "sad":
        return "😔"
      case "tired":
        return "😩"
      case "energetic":
        return "🤩"
      case "focused":
        return "🧠"
      default:
        return "😊"
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-purple-600 p-1.5"
            >
              <Flame className="h-5 w-5 text-white" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden font-bold text-lg sm:inline-block"
            >
              IGNITE
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={user ? item.path : "/login"}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-accent flex items-center gap-1.5",
                pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.icon}
              {item.name}
              {pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <EmotionModeSwitcher />
          <ModeToggle />

          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
                  <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                    <Bell className="h-5 w-5" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
                    >
                      {notificationCount}
                    </motion.span>
                  </Button>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
                  <Button variant="ghost" size="icon" className="relative" aria-label="Messages">
                    <MessageSquare className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      2
                    </span>
                  </Button>
                </motion.div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <motion.div
                      className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background border-2 border-background text-[10px]"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      {getMoodEmoji(user.mood)}
                    </motion.div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        Level {user.level} • {user.role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <motion.span className="flex items-center" whileTap={{ scale: 0.97 }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </motion.span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("login")}
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm">{t("signup")}</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t bg-background"
          >
            <div className="container py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={user ? item.path : "/login"}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md gap-2",
                      pathname === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {!user && (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full" variant="outline">
                      {t("login")}
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">{t("signup")}</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
