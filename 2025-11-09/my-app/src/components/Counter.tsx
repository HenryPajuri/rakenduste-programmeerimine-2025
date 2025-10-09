import { useEffect, useState } from "react"
import "../App.css"

function Counter() {
  const [count, setCount] = useState<number>(0)

  function increaseCounter(amount: number) {
    setCount(count => count + amount)
  }

  useEffect(() => {
    console.log("Counter mounted")
  })

  useEffect(() => {
    console.log("Counter one time setup")
  }, [])

  useEffect(() => {
    console.log("Count changed:", count)
  }, [count])

  return (
    <>
      <h1>Henry</h1>
      <div className="card">
        <h2>Count: {count}</h2>
        <div className="counter-buttons">
          <button onClick={() => increaseCounter(-100)}>-100</button>
          <button onClick={() => increaseCounter(-50)}>-50</button>
          <button onClick={() => increaseCounter(-25)}>-25</button>
          <button onClick={() => increaseCounter(-1)}>-1</button>
          <button onClick={() => increaseCounter(1)}>+1</button>
          <button onClick={() => increaseCounter(25)}>+25</button>
          <button onClick={() => increaseCounter(50)}>+50</button>
          <button onClick={() => increaseCounter(100)}>+100</button>
        </div>
      </div>
    </>
  )
}

export default Counter
