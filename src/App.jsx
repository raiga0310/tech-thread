import { Header } from './Header'
import { ThreadContainer } from './ThreadContainer'
import './App.css'
import { ScrollRestoration } from 'react-router-dom'

function App() {
  return (
    <div className='app'>
      <Header />
      <ThreadContainer className="thread__container" />
      <ScrollRestoration />
    </div>
  )
}

export default App
