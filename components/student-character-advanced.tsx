"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function StudentCharacterAdvanced() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="relative w-full h-full">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Character body */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {/* Head */}
        <motion.div className="relative">
          {/* Body */}
          <motion.div
            className="w-48 h-64 rounded-3xl bg-gradient-to-b from-primary/80 to-purple-600/80 relative"
            animate={{ rotate: [0, 1, 0, -1, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Face */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              {/* Eyes */}
              <motion.div
                className="flex space-x-8"
                animate={{
                  y: [0, -2, 0, 2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.1, 1, 0.9, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="w-6 h-6 rounded-full bg-primary"
                  animate={{
                    scale: [1, 0.9, 1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              {/* Mouth */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-6 rounded-full border-2 border-primary"
                animate={{
                  height: [6, 10, 6],
                  width: [16, 20, 16],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>

            {/* Arms */}
            <motion.div
              className="absolute -left-12 top-16 w-16 h-8 rounded-full bg-primary/80"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -right-12 top-16 w-16 h-8 rounded-full bg-primary/80"
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />

            {/* Legs */}
            <motion.div
              className="absolute -left-4 -bottom-12 w-8 h-16 rounded-full bg-primary/80"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -right-4 -bottom-12 w-8 h-16 rounded-full bg-primary/80"
              animate={{ rotate: [0, -5, 0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />

            {/* Accessories - Graduation cap */}
            <motion.div
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-10"
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="w-32 h-8 bg-gray-800 dark:bg-gray-700 rounded-md" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-900 dark:bg-gray-600" />
              <motion.div
                className="absolute -right-2 top-4 w-8 h-8 bg-primary rounded-full"
                animate={{
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Book or tablet */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-white dark:bg-gray-700 rounded-md shadow-lg flex items-center justify-center"
              animate={{
                rotateX: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="w-28 h-16 bg-gray-100 dark:bg-gray-800 rounded-sm flex items-center justify-center">
                <div className="text-xs text-center text-primary font-bold">IGNITE</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30 w-8 h-8"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Code symbols */}
      {["{", "}", "<>", "()"].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-lg font-mono text-primary/70"
          style={{
            top: `${15 + i * 20}%`,
            left: `${80 - i * 15}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: i * 0.3,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  )
}

export default StudentCharacterAdvanced
