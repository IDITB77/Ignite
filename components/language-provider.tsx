"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Available languages
const languages = {
  en: {
    name: "English",
    code: "en",
    direction: "ltr",
  },
  hi: {
    name: "हिन्दी",
    code: "hi",
    direction: "ltr",
  },
  ta: {
    name: "தமிழ்",
    code: "ta",
    direction: "ltr",
  },
  bn: {
    name: "বাংলা",
    code: "bn",
    direction: "ltr",
  },
}

// Translation data (simplified for demo)
const translations = {
  en: {
    "home.hero.title": "Turn Students into Leaders — in One Place",
    "home.hero.subtitle": "Grow your skills. Heal your doubts. Find your people.",
    "home.hero.cta": "Begin Your Journey",
    "home.hero.cta2": "Set Your Growth Goals",
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.journal": "Journal",
    "nav.skills": "Skills",
    "nav.incubation": "Incubation",
    "nav.teams": "Teams",
    "nav.missions": "Missions",
    "nav.mentor": "AI Mentor",
    login: "Log In",
    signup: "Sign Up",
    "dashboard.title": "Your Growth Universe",
    "dashboard.welcome": "Welcome back, {name}! Here's your personalized dashboard.",
  },
  hi: {
    "home.hero.title": "छात्रों को नेता बनाएं — एक ही जगह पर",
    "home.hero.subtitle": "अपने कौशल विकसित करें। अपने संदेहों को दूर करें। अपने लोगों को खोजें।",
    "home.hero.cta": "अपनी यात्रा शुरू करें",
    "home.hero.cta2": "अपने विकास लक्ष्य निर्धारित करें",
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.journal": "जर्नल",
    "nav.skills": "कौशल",
    "nav.incubation": "इनक्यूबेशन",
    "nav.teams": "टीम",
    "nav.missions": "मिशन",
    "nav.mentor": "AI मेंटर",
    login: "लॉग इन",
    signup: "साइन अप",
    "dashboard.title": "आपका विकास ब्रह्मांड",
    "dashboard.welcome": "वापस स्वागत है, {name}! यहां आपका व्यक्तिगत डैशबोर्ड है।",
  },
  ta: {
    "home.hero.title": "மாணவர்களை தலைவர்களாக மாற்றுங்கள் — ஒரே இடத்தில்",
    "home.hero.subtitle": "உங்கள் திறன்களை வளர்த்துக் கொள்ளுங்கள். உங்கள் சந்தேகங்களை குணப்படுத்துங்கள். உங்கள் மக்களைக் கண்டறியுங்கள்.",
    "home.hero.cta": "உங்கள் பயணத்தைத் தொடங்குங்கள்",
    "home.hero.cta2": "உங்கள் வளர்ச்சி இலக்குகளை அமைக்கவும்",
    "nav.home": "முகப்பு",
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.journal": "ஜர்னல்",
    "nav.skills": "திறன்கள்",
    "nav.incubation": "இன்குபேஷன்",
    "nav.teams": "குழுக்கள்",
    "nav.missions": "மிஷன்கள்",
    "nav.mentor": "AI மென்டர்",
    login: "உள்நுழைய",
    signup: "பதிவு செய்ய",
    "dashboard.title": "உங்கள் வளர்ச்சி பிரபஞ்சம்",
    "dashboard.welcome": "மீண்டும் வரவேற்கிறோம், {name}! இதோ உங்கள் தனிப்பயனாக்கப்பட்ட டாஷ்போர்டு.",
  },
  bn: {
    "home.hero.title": "ছাত্রদের নেতা বানান — একই জায়গায়",
    "home.hero.subtitle": "আপনার দক্ষতা বাড়ান। আপনার সন্দেহ দূর করুন। আপনার মানুষ খুঁজুন।",
    "home.hero.cta": "আপনার যাত্রা শুরু করুন",
    "home.hero.cta2": "আপনার বৃদ্ধির লক্ষ্য নির্ধারণ করুন",
    "nav.home": "হোম",
    "nav.dashboard": "ড্যাশবোর্ড",
    "nav.journal": "জার্নাল",
    "nav.skills": "দক্ষতা",
    "nav.incubation": "ইনকিউবেশন",
    "nav.teams": "টিম",
    "nav.missions": "মিশন",
    "nav.mentor": "AI মেন্টর",
    login: "লগ ইন",
    signup: "সাইন আপ",
    "dashboard.title": "আপনার বৃদ্ধির মহাবিশ্ব",
    "dashboard.welcome": "ফিরে আসার জন্য স্বাগতম, {name}! এখানে আপনার ব্যক্তিগতকৃত ড্যাশবোর্ড রয়েছে।",
  },
}

type LanguageCode = keyof typeof languages
type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  currentLanguage: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: string, params?: Record<string, string>) => string
  languages: typeof languages
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en")

  // Load language preference from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem("ignite-language") as LanguageCode
    if (storedLanguage && languages[storedLanguage]) {
      setCurrentLanguage(storedLanguage)
    }
  }, [])

  // Set language and save to localStorage
  const setLanguage = (code: LanguageCode) => {
    if (languages[code]) {
      setCurrentLanguage(code)
      localStorage.setItem("ignite-language", code)
      document.documentElement.lang = code
      document.documentElement.dir = languages[code].direction
    }
  }

  // Translation function
  const t = (key: string, params?: Record<string, string>) => {
    const translation =
      translations[currentLanguage][key as TranslationKey] || translations.en[key as TranslationKey] || key

    if (params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, value)
      }, translation)
    }

    return translation
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
