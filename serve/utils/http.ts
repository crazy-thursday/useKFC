export default async (url: string, init: RequestInit) => {
  const responese = await fetch(url, { ...(init || {}) })
  const responeseService = await responese.json()
  if (responese.status >= 300) {
    console.error(responeseService.message)
  }
  responeseService.status = responese.status
  return responeseService
}

export function generateAuthHeader(token: string): Record<string, string> {
  return {
    Authorization: `token ${token}`
  }
}
