import { useState } from 'react'
import './App.css'
import { TURNS} from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { Square } from './components/Square/Square'
import { WinnerModal } from './components/WinnerModal/WinnerModal'

// ESTO SERIA UN COMPONENTE


function App() {
  // ESTO SERIA EL ESTADO
  const [board, setBoard]  = useState(() =>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.x
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return
    // Siempre crear una nueva variable para no mutar el estado
    // Los estados son inmutables
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    const newBoard = [...board];  // Propaga los elementos dentro de un nuevo array
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
    else if (newWinner === null && checkEndGame(newBoard)) {
      setWinner(false)
    }


     
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  return (
    <main className='board'>
      <h1>TIC-TAC-TOE</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
          {
            board.map((_, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard} >
                  {board[index]}
                </Square>
                 
              )
            })
          }
      </section>
      <section className='turn'>
        <Square isSelected = {turn === TURNS.x} > {TURNS.x} </Square>
        <Square isSelected = {turn === TURNS.o}> {TURNS.o}</Square>
      </section>
      {
        winner !== null && <WinnerModal winner={winner} resetGame={resetGame} />
      }


    </main>
  )
}

export default App 
