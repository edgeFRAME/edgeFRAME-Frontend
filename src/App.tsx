import './App.css'
import DropFile from './DropFile.tsx'



function App() {
  return (
    <>
      <div id="layout">
        <header>
          <h1 id='title'>edgeFRAME</h1>
        </header>
        <main className='magicpattern'>
          <DropFile maxSize={200} dataUnit='MB'/> {/* Magic Number solucionar */}
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default App
