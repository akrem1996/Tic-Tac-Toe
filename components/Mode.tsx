import '../app/globals.css';

const Mode = ({ onSelectMode }: { onSelectMode: (mode: 'player' | 'computer') => void}) => {

    return(
        <div className="mode-selection-container">
            <h1>Wähle einen Modus</h1>
            <button onClick={() => onSelectMode('player')}>Gegen Spieler</button>
            <button onClick={() => onSelectMode('computer')}>Gegen Computer</button>
      </div>
    )
    
}

export default Mode;