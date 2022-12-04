import type { SlogenItem } from '../use-kfc'

/**
 * @description parse slogen object to slogen list
 * @param {Record<string, SlogenItem>} slogenLike slogen object
 * @returns {SlogenItem[]}
 */
export default function useParseSlogen(
  slogenLike: Record<string, SlogenItem>
): SlogenItem[] {
  return Object.values(slogenLike)
}
