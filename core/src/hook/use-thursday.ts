/**
 * @description check current day of week is thursday
 * @returns {boolean}
 */
export default function useThursday(): boolean {
  return new Date().getDay() === 4
}
