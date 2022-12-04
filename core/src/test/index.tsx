import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import useKFC from '../use-kfc'
import defaultSlogen from '../slogen.json'

const defaultSlogenList = Object.values(defaultSlogen)

const App = () => {
  const [signal, setSignal] = useState<number>(Date.now())
  const { slogen } = useKFC<number>({
    slogenList: defaultSlogenList,
    refreshSignal: signal,
    skipDayCheck: true
  })

  return (
    <>
      <pre style={{ width: '100%', wordBreak: 'break-all' }}>{slogen}</pre>
      <button onClick={() => setSignal(Date.now())}>change signal</button>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
