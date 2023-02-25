import { useEffect, useState } from 'react';
import './App.css';
import Die from './component/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
// import Confetti from 'react-confetti';

function App() {
  const [tenzies, setTenzies] = useState(false);

  const generateNewDice = () =>  {
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    let newDice = [];
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDice()) 
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice());

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die=> {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const rollDice = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld 
        ? die 
        : generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // End functionality
  useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld);
    const firstDieValue = dice[0].value;
    const AllSameValue = dice.every(die => die.value === firstDieValue)
    if(allHeld && AllSameValue) {
      setTenzies(true)
    }
  }, [dice])

  const diceElement = dice.map(die => <Die 
                                  key={die.id} 
                                  value={die.value}
                                  isHeld={die.isHeld}
                                  holdDice={()=>holdDice(die.id)}
                                /> 
                              )

  return (
    <main className="main-container">
      {tenzies && <Confetti width="2000px"/>}
      <h1 className='title'>Tenzies</h1>
      <p className='introduction'>
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className='roll-dice' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
