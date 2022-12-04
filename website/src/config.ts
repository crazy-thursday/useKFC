// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
export type PowerItem = {
  name: string
  icon: string
  link: string
  type: 'deno' | 'render'
}

export const SITE_TITLE = 'crazy thursday'
export const SITE_DESCRIPTION = 'v me 50!'

// urls
export const SITEDENO = 'https://use-kfc.deno.dev/'
export const SITERENDER = 'https://use-kfc.onrender.com/'

export const POWERLIST: PowerItem[] = [
  { name: 'Deno', type: 'deno', link: SITEDENO, icon: 'deno.svg' },
  { name: 'Render', type: 'render', link: SITERENDER, icon: 'render.svg' }
]
