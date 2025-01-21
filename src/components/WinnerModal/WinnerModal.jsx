import {Square} from '../Square/Square'
export const WinnerModal = ({winner, resetGame}) => {
    return(
        <section className="winner">
            <div className="text">
                <h2>
                    {
                        winner === false
                        ? 'Empate'
                        : 'Gano'
                    }
                </h2>
                <header className="win">
                    {winner && <Square>{winner}</Square>} 
                </header>
                <footer>
                    <button onClick={resetGame}>Reiniciar</button>
                </footer>
            </div>
                     
        </section>
    )

}