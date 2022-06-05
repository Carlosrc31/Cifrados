import react, {useState} from "react";

function RSA(){

    const [valoresRSA, setValoresRSA] = useState({
        valorP: null,
        valorQ: null,
        valorE: null,
        valorN: null,
        valorD: null, 
    });

    const [mostrar, setMostrar] = useState(false);

    function handleInput(event){
        setValoresRSA({
            ...valoresRSA,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();

        //Se verifica si el número es primo
        function esPrimo(n){
            let c = 0, x = 2;
            if(n >= 2){
                while( x <= n / 2){
                    if( n % x == 0){
                        c += 1;
                    }
                    x += 1;
                    if(c == 0){
                        return true;
                    }
                    else{
                        return false;
                    }        
                }
            }
            else{
                return false;
            }
        }

        //condicional para no hacer proceso en caso de que no sea num primo
        if(!esPrimo(valoresRSA.valorP) || !esPrimo(valoresRSA.valorQ) || valoresRSA.valorP == valoresRSA.valorQ){
            alert('Ingresa un número primo y "p" diferente de "q"');
            return;
        }
        
        //Conseguir valor n
        let n = valoresRSA.valorP * valoresRSA.valorQ;
        
        //Conseguir valor de omega de n
        let omegaN = (valoresRSA.valorP - 1) * (valoresRSA.valorQ - 1);

        let aux = 1;
        let residuo = (1 + aux * omegaN) % valoresRSA.valorE;

        while(residuo != 0){
            aux += 1;
            residuo = (1 + aux * omegaN) % valoresRSA.valorE;
        }

        let valorAuxD = parseInt((1 + aux * omegaN) / valoresRSA.valorE);

        setValoresRSA({
            ...valoresRSA,
            valorD: valorAuxD,
            valorN: n
        })

        setMostrar(true);
    }

    return(
        <div className="rsa">
            <h1>Cifrado RSA</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='number' 
                    placeholder="Valor de p"
                    name='valorP'
                    onChange={handleInput}
                />
                <input 
                    type='number' 
                    placeholder="Valor de q"
                    name="valorQ"
                    onChange={handleInput}
                />
                <input 
                    type='number' 
                    placeholder="Valor de e"
                    name='valorE'
                    onChange={handleInput}
                />
                <button type='submit'>Submit</button>
            </form>
            <p style={{display: mostrar ? null : "none"}} >KU = {valoresRSA.valorE}, {valoresRSA.valorN}</p>
            <p style={{display: mostrar ? null : "none"}} >KR = {valoresRSA.valorD}, {valoresRSA.valorN}</p>
        </div>
    );
}

export default RSA;