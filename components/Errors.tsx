import '../app/globals.css';

const Errors = ({ message }: { message: string }) => {

    return(
        <div>
            {message &&  <p> {message} </p>}
        </div>   
    ) 
}

export default Errors;