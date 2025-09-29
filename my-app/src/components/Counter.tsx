import React, { useEffect, useState } from "react"
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
      <h1>Raimo</h1>
      <div className="card">
        <button onClick={() => increaseCounter(10)}>count is {count}</button>
      </div>
    </>
  )
}

export default Counter
