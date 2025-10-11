import './App.css'
import DropFile from './DropFile.tsx'



function App() {
  return (
    <>
      <div id="layout">
        <header></header>
        <main>
          <DropFile maxSize={200} dataUnit='MB'/> {/* Magic Number solucionar */}
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default App
