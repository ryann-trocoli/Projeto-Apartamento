import { useEffect, useRef, useState } from 'react'

/**
 * Revela o conteúdo com um leve deslizamento quando a seção
 * entra na tela (microinteração discreta, respeita a
 * preferência "reduzir movimento" do sistema — ver index.css).
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visivel ? 'reveal-visivel' : ''} ${className}`}>
      {children}
    </div>
  )
}
