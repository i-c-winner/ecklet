'use client'

import { useCallback, useEffect, useRef } from 'react'
import {usePathname} from 'next/navigation'
import ReactDOM from 'react-dom/client'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

export function useShadowDOM() {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const reactRootRef = useRef<ReactDOM.Root | null>(null)
  const emotionCacheRef = useRef<ReturnType<typeof createCache> | null>(null)

  console.log(pathname, 'pathname')
  useEffect(() => {
    const host = containerRef.current
    if (!host) return

    // не создаём повторно
    if (host.shadowRoot) return

    const shadowRoot = host.attachShadow({ mode: 'open' })

    /* базовые стили shadow-root */
    const style = document.createElement('style')

    style.textContent = `
      :host {
        position: fixed;
        inset: 0;
        z-index: 10000;
        pointer-events: none;
        display: ${pathname.includes('print-pdf') ? 'none' : 'block'};
      }

      .shadow-root {
        position: relative;
        pointer-events: auto;
        font-family: Roboto, sans-serif;
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }
      
      @media print {
        .shadow-root {
          display: none;
        }
      }
    `
    shadowRoot.appendChild(style)

    const reactContainer = document.createElement('div')
    reactContainer.className = 'shadow-root'
    shadowRoot.appendChild(reactContainer)

    // emotion cache именно в shadow-root
    emotionCacheRef.current = createCache({
      key: 'mui-shadow',
      container: shadowRoot
    })

    reactRootRef.current = ReactDOM.createRoot(reactContainer)

    return () => {
      reactRootRef.current?.unmount()
      reactRootRef.current = null
      emotionCacheRef.current = null
    }
  }, [])

  const renderInShadow = useCallback((node: React.ReactNode) => {
    if (!reactRootRef.current || !emotionCacheRef.current) return

    reactRootRef.current.render(
      <CacheProvider value={emotionCacheRef.current}>
        {node}
      </CacheProvider>
    )
  }, [])

  return {
    containerRef,
    renderInShadow
  }
}
