"use client"

import { useEffect, useState } from 'react';
import '../app/globals.css';
import Fields from './Fields';
import Mode from "./Mode"

type Player = 'X' | 'O' | string | null


const Lobby = () => {
  const [fields, setFields] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(Math.round(Math.random() * 1) === 1 ? "X" : "O")
  const [winner, setWinner] = useState<Player>(null)
  const [mode, setMode] = useState<'player' | 'computer' | null>(null);


  function setFieldsValue(index:number){
    if (fields[index] || winner) return;
    const newFields = fields.map((val,i) => {
      if(i === index){
        return currentPlayer
      }
      return val
    })
    setFields(newFields)
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  function resetGame(){
    const resetedFields = Array(9).fill(null)
    setFields(resetedFields)
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O")
    setWinner(null)
  }

  function changeModeGame(){
    resetGame()
    setMode(null)
  }

  function isWinner(fields:Player[]){
    let combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < combs.length; index++) {
      const [first, second, third] = combs[index];
      if(fields[first] && fields[first] === fields[second] && fields[first] === fields[third]){
        return fields[first]
      }
    }
    return null
  }

  function handleCallback(childData:any) {
    setMode(childData);
  };


    
  useEffect(() => {
    const checkWinner = isWinner(fields);

    if (checkWinner) {
      setWinner(checkWinner);
    } else if (!fields.includes(null)) {
      setWinner("equal Game");
    }
    else if (mode === 'computer' && currentPlayer === 'O') {
      const emptyFields = fields.map((val, i) => val === null ? i : null).filter(val => val !== null);
      const randomMove = emptyFields[Math.floor(Math.random() * emptyFields.length)];
      setTimeout(() => setFieldsValue(randomMove as number), 500);
    }
  }, [fields, currentPlayer, mode]);

  if (mode === null) {
    return (
      <Mode  onSelectMode={setMode}/>
    );
  }

  
  return (
    <div>
      <div className='state'>
        {!winner &&<p>it's {currentPlayer} turn </p>}
        {winner && winner !== "equal Game" &&<p> Congratulations {winner } youre the winner </p>}
        {winner && winner === "equal Game" &&<p>Tie Game</p>}
      </div>
      <div className="grid">
        {Array(9).fill(null).map((_, i) => {
         return <Fields  winner ={winner} key={i} onClick={() => setFieldsValue(i)} value={fields[i]}/>
        })}
      </div>
      <div className="button-container">
        <button  className = "reset" onClick={() => resetGame()}>Reset Game</button>
        <button className="reset" onClick={() => changeModeGame()}>Back to Mode </button>
      </div>
    </div>
    
   
  );
}

export default Lobby;