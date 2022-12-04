/**
 * @description provide a number of 0 ~ {len}
 * @param {number} len max number for random
 * @returns {number}
 */
export default function useRandomIndex(len: number): number {
  return Math.floor(Math.random() * len)
}
