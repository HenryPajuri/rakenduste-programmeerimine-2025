import React, { useState } from "react"

const Dice = () => {
  const [diceValue, setDiceValue] = useState<number>(1)

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1
    setDiceValue(randomNumber)
  }

  return (
    <div className="dice-container">
      <div className="dice-content">
        <h1>Täring</h1>
        <div className="dice-display">
          <span className="dice-number">{diceValue}</span>
        </div>
        <button onClick={rollDice} className="roll-button">
          Viska täringut
        </button>
      </div>
    </div>
  )
}

export default Dice