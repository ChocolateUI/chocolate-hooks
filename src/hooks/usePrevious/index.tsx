import { useRef } from 'react'

/**
 * 读取上一次的值
 */
export type CompareFunction<T> = (prev: T | undefined, next: T) => boolean

function usePrevious<T>(state: T, compare?: CompareFunction<T>): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()

  const needUpdate =
    typeof compare === 'function' ? compare(curRef.current, state) : true
  if (needUpdate) {
    prevRef.current = curRef.current
    curRef.current = state
  }

  return prevRef.current
}

export default usePrevious
