import { useMemo, useRef } from 'react'

/**
 * @description control refresh signal
 * @param {T} refreshSignal custom refreshSignal
 * @returns {T}
 */
export default function useManualRefresh<T = string>(refreshSignal: T): T {
  const oldRefreshSignal = useRef<T>(refreshSignal)

  return useMemo<T>(() => {
    if (oldRefreshSignal.current !== refreshSignal) {
      oldRefreshSignal.current = refreshSignal
      return refreshSignal
    }

    return oldRefreshSignal.current
  }, [refreshSignal])
}
