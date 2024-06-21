import '../app/globals.css';

const Fields = ({winner, onClick, value}:{winner: string | null, onClick: () => void, value: string | null}) => {

    const getButtonClass = () => {
        if (value === 'X') return 'field x';
        if (value === 'O') return 'field o';
        return 'field';
      };

    return(
        <button
            className={getButtonClass()}
            onClick={onClick}
            disabled={Boolean(winner) || Boolean(value)}
            >
            {value}
        </button>
    )
    
}

export default Fields;