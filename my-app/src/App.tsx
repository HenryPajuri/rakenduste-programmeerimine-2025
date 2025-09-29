import { useState } from "react"
import Counter from "./components/Counter"
import EventListener from "./components/EventListener"
import Ref from "./components/Ref"
import Form from "./components/Form"
import Profile from "./components/Profile"
import Dice from "./components/Dice"

function App() {
  const [show, setShow] = useState<boolean>(true)
  const [showCounter, setShowCounter] = useState<boolean>(true)

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
