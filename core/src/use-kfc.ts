import { useRef, useMemo } from 'react'
import useThursday from './hook/use-thursday'
import useRandomIndex from './hook/use-random-index'
import useManualRefresh from './hook/use-manual-refresh'

/**
 * @description slogen item struct
 */
export type SlogenItem = {
  /**
   * @description slogen content message
   */
  content: string
  /**
   * @description slogen id to avoid repeat
   */
  id: string | number
}

export type Options<T> = {
  /**
   * @description is provide, slogen will random from this array
   */
  slogenList: SlogenItem[]
  /**
   * @description manual refresh slogen
   */
  refreshSignal?: T
  /**
   * @description whether skip thursday check
   */
  skipDayCheck?: boolean
}

// default slogen
const DEFAULTSLOGEN = {
  id: '0000TURSDAY_KFC',
  content: 'crazy thursday, vme50!'
}

function useKFC<T = string | number>(options: Options<T>) {
  // check data is valid
  const isThursday = useRef(useThursday())

  // check
  const checkResult = isThursday.current || options?.skipDayCheck

  // store slogenId avoid repeat
  const slogenId = useRef<string | number>()

  // manual refresh slogen signal
  const refreshIdle = useManualRefresh<T>(
    options?.refreshSignal ?? (slogenId.current as T)
  )

  // random index for slogen list
  const randomIndex = useRandomIndex(
    options?.slogenList?.filter((v) => v.id !== slogenId.current)?.length ?? 0
  )

  if (!checkResult) {
    console.error('today is not thursday!!!')
  }

  /**
   * @description random a slogen from slogenList
   */
  const slogen = useMemo<string>(() => {
    if (!checkResult) return ''

    const { slogenList } = options ?? {}
    if (Array.isArray(slogenList) && slogenList.length) {
      let randomSlogen = slogenList[0]
      if (slogenList.length > 1) {
        randomSlogen = slogenList.filter((v) => v.id !== slogenId.current)[
          randomIndex
        ]
      }
      const { content, id } = randomSlogen
      slogenId.current = id
      return content
    }
    return DEFAULTSLOGEN.content
  }, [randomIndex, refreshIdle])

  return {
    slogen
  }
}

export default useKFC
