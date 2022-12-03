import http, { generateAuthHeader } from '../utils/http.ts'
import { DATADIRBASE } from '../constants/store.ts'

export const HOST = 'https://api.github.com'

const fetchForGithub = (url: string, token: string, option?: RequestInit) => {
  const headers = generateAuthHeader(token)
  console.log(`[KFC-Github ---> 🫁] ${url} ${token}`)
  return http(`https://api.github.com${url}`, { ...(option || {}), headers })
}

export interface ICreateCommitOption {
  path: string
  content: string
  sha?: string
}

export function checkAuth(token: string): Promise<boolean> {
  return fetchForGithub('/user', token).then((response) => {
    if (response.status !== 200) {
      return false
    }
    return true
  })
}

export const createCommit = (token: string, option: ICreateCommitOption) => {
  const { content, sha, path } = option
  const url = generateCommitUrl(option)
  const body: Record<string, unknown> = {
    content,
    message: `update(slogen): ${path} - ${sha ?? 'create'}`
  }
  if (sha) {
    body.sha = sha
  }
  return fetchForGithub(url, token, {
    method: 'PUT',
    body: JSON.stringify(body)
  })
}

export const getContent = (token: string, option: ICreateCommitOption) => {
  const url = generateCommitUrl(option)
  return fetchForGithub(url, token)
}

export const generateCommitUrl = (option: ICreateCommitOption): string => {
  const { path } = option
  return `/repos/crazy-thursday/useKFC/contents/serve/${DATADIRBASE}/${path}`
}
