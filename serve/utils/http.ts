export default async (url: string, init: RequestInit) => {
  const responese = await fetch(url, { ...(init || {}) })
  const responeseService = await responese.json()
  if (responese.status >= 300) {
    console.error(responeseService.message)
  }
  return responeseService
}

export function generateAuthHeader(token: string): Record<string, string> {
  return {
    Authorization: `token ${token}`
  }
}
