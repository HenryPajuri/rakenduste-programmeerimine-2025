import './App.css'
import PropDrilling from './PropDrilling'
import Context from './Context'

function App() {
  return (
    <>
      <h1>Prop Drilling vs Context</h1>
      <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', marginTop: '40px' }}>
        <div>
          <h2>Prop Drilling</h2>
          <PropDrilling />
        </div>
        <div>
          <h2>Context API</h2>
          <Context />
        </div>
      </div>
    </>
  )
}

export default App
