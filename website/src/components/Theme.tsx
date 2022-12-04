import type { FC } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Sun, Moon } from './Icons'

import 'src/styles/index.less'

const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== undefined && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.removeAttribute('data-mode')
    } else {
      root.setAttribute('data-mode', 'dark')
    }
  }, [theme])

  const handleToggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', nextTheme)
    window.dispatchEvent(new CustomEvent('theme-change', { detail: nextTheme }))
    setTheme(nextTheme)
  }, [theme])

  return (
    <button
      className="relative p-0 m-0 rounded-xl w-10 h-6 border border-solid border-neutral-400 dark:border-neutral-600 dark:bg-neutral-700 transition-colors"
      role="switch"
      type="button"
      aria-label={`toggle ${theme ?? 'dark'} mode`}
      onClick={handleToggleTheme}
    >
      <span className="relative block w-full h-full dark:translate-x-2/4 transition-all">
        <Sun className="absolute top-2/4 -translate-y-2/4 left-px sun text-lg" />
        <Moon className="absolute top-2/4 -translate-y-2/4 left-px moon text-lg" />
      </span>
    </button>
  )
}

export default ThemeToggle
