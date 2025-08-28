import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [node, setNode] = useState<Element | null>(null)
  const frozen = useRef(false)

  useEffect(() => {
    if (!window.IntersectionObserver || !node) return

    if (frozen.current && freezeOnceVisible) return

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setEntry(entry)
        if (entry.isIntersecting && freezeOnceVisible) {
          frozen.current = true
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [node, threshold, root, rootMargin, freezeOnceVisible])

  const ref = (element: Element | null) => setNode(element)

  return { ref, entry, isIntersecting: !!entry?.isIntersecting }
}