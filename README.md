<p align="center">
  <a href="https://use-kfc.deno.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://api.iconify.design/noto-v1:french-fries.svg" alt="kfc logo" />
  </a>
  <br />
  <h3 align="center">
  <span>
    <a>English</a> | 
    <a href="./README.CN.md">Chinese</a>
  </span>
  <h3>
</p>
<br />
<p align="center">
  <a href="https://www.npmjs.com/package/@crazy-thursday/use-kfc"><img src="https://img.shields.io/npm/v/@crazy-thursday/use-kfc" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@crazy-thursday/use-kfc" alt="node compatibility"></a>
  <a href="https://github.com/crazy-thursday/useKFC/actions/workflows/deploy-deno.yml"><img src="https://github.com/crazy-thursday/useKFC/actions/workflows/deploy-deno.yml/badge.svg?branch=main" alt="build status"></a>
  <a href="https://discord.gg/b2SCucyKyn"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord" alt="discord chat"></a>
</p>
<br />
<div align="center">
  <h1>useKFC</h1>
  <p>make kfc slogen for crazy thursday!!!<p>
</div>

## Usage

- hooks 🌩

```jsx
import useKFC from '@crazy-thursday/use-kfc'
```

- api 💻

```bash
$ curl 'https://use-kfc-serve.deno.dev/kfc'
```

- data struct 📚

```ts
export enum CODE {
  /**
   * @description success code
   */
  SUCCESS = 10086,
  /**
   * @description failed code
   */
  FAILED = 10087,
  /**
   * @description deny code
   */
  DENY = 10089
}

type DataStruct = {
  code: CODE
  ip: string
  method: 'GET'
  data: {
    content: string
    id: string
    createUser: string
  }
}
```

## Slogen

The repository has some slogen built in. You can also use issues to contribute to slogen. But please make sure that the issue contains complete and non-controversial text or emoticons. Add the slogen tag after you finish editing the content. Github CI will automatically collect your contributions to the repository.

## Contribution

See [Contributing Guide](CONTRIBUTING.md).

## License

[MIT](LICENSE).

## Sponsoring

<table>
  <tr align="center">
    <td>
      <a href="https://www.buymeacoffee.com/innocces" target="_blank">
        <img width="150" src="https://api.iconify.design/vscode-icons:file-type-coffeescript.svg">
      </a>
    </td>
    <td>
      <a href="https://afdian.net/a/innocces" target="_blank">
        <img width="150" src="https://cdn.jsdelivr.net/gh/innocces/DrawingBed/2022-12-04/1670124736895-afdian.png">
      </a>
    </td>
  </tr>
</table>
