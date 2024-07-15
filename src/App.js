import { useState, useEffect } from "react";
import Die from "./components/Die";

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);

  function generateNewDie(i) {
    return {
      id: i + 1,
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    };
  }

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie(i));
    }
    return diceArray;
  }

  function rollDice() {
    // OLD VERSION
    // setDiceArray(allNewDice());

    if (!tenzies) {
      // NEW VERSION
      setDiceArray((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie(die.id - 1);
        })
      );
    } else {
      setTenzies(false);
      setDiceArray(allNewDice());
      setCount(-1);
    }

    console.log(diceArray);
  }

  function holdDice(id) {
    setDiceArray((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  useEffect(() => {
    console.log(diceArray);
  }, []);

  useEffect(() => {
    // console.log("Dice state changed");
    const allHeld = diceArray.every((die) => die.isHeld);
    const firstValue = diceArray[0].value;
    const allSameValue = diceArray.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      // console.log("You won!");
    }
  }, [diceArray]);

  return (
    <main>
      <div className="description-container">
        <div className="title">Tenzies</div>
        <div className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </div>
      </div>
      <div className="dice-container">
        {diceArray.map((die) => (
          <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))}
      </div>
      <button
        className="roll-dice"
        onClick={() => {
          rollDice();
          setCount((oldValue) => oldValue + 1);
        }}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies && <p>Rolls done: {count}</p>}

      {/* <p className="extras">
        <ul>
          <li>Track the number of rolls [DONE]</li>
          <li>Save your best number of rolls to localStorage</li>
          <li>add dark mode</li>
        </ul>
      </p> */}
    </main>
  );
}

export default App;
