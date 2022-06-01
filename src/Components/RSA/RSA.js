import react from "react";

function RSA(){

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <div className="rsa">
            <h1>Cifrado RSA</h1>
            <form onSubmit={handleSubmit}>
                <input type='number' placeholder="Valor de p"/>
                <input type='number' placeholder="Valor de q"/>
                <input type='number' placeholder="Valor de e"/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default RSA;