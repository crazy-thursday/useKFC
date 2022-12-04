export function host(): string {
  return new URL(import.meta.url).origin
}
