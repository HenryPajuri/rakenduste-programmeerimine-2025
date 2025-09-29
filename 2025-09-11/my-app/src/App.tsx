import Counter from "./components/Counter"
import Form from "./components/Form"
import Profile from "./components/Profile"
import Dice from "./components/Dice"

function App() {

  return (
    <>
      <Counter />
      <Profile />
      <Dice />
      {/*  {show && <EventListener />}
      <button onClick={() => setShow(!show)}>Toggle EventListener</button> */}
      {/* {show ? <Ref /> : <div>No Ref</div>}
      <button onClick={() => setShow(!show)}>Toggle Ref</button> */}
      <Form />
    </>
  )
}

export default App
