import { Header } from './Header'
import { ThreadContainer } from './ThreadContainer'
import './App.css'

function App() {
  return (
    <div className='app'>
      <Header />
      <ThreadContainer className="thread__container" />
    </div>
  )
}

export default App
