import react, {useState} from "react";

function Hill(){
    
    const [mensaje, setMensaje] = useState('');
    const [valork, setValork] = useState(0);
    const [mensajeFinal, setMensajeFinal] = useState('');
    const [cifradoDescifrado, setCifradoDescifrado] = useState(1);

    function handleCifrarDescifrar(e){
        setCifradoDescifrado(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        
        //Se define el abecedario
        let abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

        //Se obtiene el mensaje
        setMensaje(e.target[0].value);
        //Se obtiene el valor de k o M
        setValork(e.target[1].value);

        //Guarda valores con el nuevo mensaje
        let arrayValMsj = [];

        //Se genera un array de la cadena original
        let arrayMsj = Array.from(mensaje.toLowerCase());

        //Guarda valores con k
        let arrayValK = []; 
        //Se genera un array de k
        let arrayK = Array.from(valork.toLowerCase());  

        // Se compara con que letra coincide de nuestro alfabeto y se le da el valor
        arrayMsj.forEach(valormsj => {
          abc.forEach(valorabc => {
            if(valormsj === valorabc){
              arrayValMsj.push(abc.indexOf(valormsj));
            }
          });
        });

        // Se compara con que letra coincide de nuestro alfabeto y se le da el valor        
        arrayK.forEach(valordeK => {
            abc.forEach(valorabc => {
                if(valordeK === valorabc){
                arrayValK.push(abc.indexOf(valordeK));
                }
            });
        });

        console.log('arrayK: '+arrayK+'valoresK: '+arrayValK);

        //Se divide el mensaje en dos bloques
        let bloque1 = [arrayValMsj[0],arrayValMsj[1]];
        let bloque2 = [arrayValMsj[2],arrayValMsj[3]];

        // console.log(bloque1+' '+bloque2);

        let bloque = 0;
        let arrayValoresFinales = [];

        function cifrado(arrayValK){
            while(bloque < 2){
                let val1 = 0, val2 = 0, i=0;
                
                while (i < arrayValK.length){
                    if(bloque == 0){
                        //Me ayuda a saber si se multiplica por el primero o el segundo del array de cada bloque
                        let numbloque = i % 2;
                        if(i < 2){
                            val1 += arrayValK[i] * bloque1[numbloque];
                            console.log('iter: '+i+'val1: '+val1);
                        }
                        else{
                            val2 += arrayValK[i] * bloque1[numbloque];
                            console.log('iter: '+i+'val2: '+val2);
                        }
                        i++;
                    }
                    else{
                        //Me ayuda a saber si se multiplica por el primero o el segundo del array de cada bloque
                        let numbloque = i % 2;
                        if(i < 2){
                            val1 += arrayValK[i] * bloque2[numbloque];
                            console.log('iter: '+i+'val1: '+val1);
                        }
                        else{
                            val2 += arrayValK[i] * bloque2[numbloque];
                            console.log('iter: '+i+'val2: '+val2);
                        }
                        i++; 
                    }
                }
                val1 = val1 % 27;
                val2 = val2 % 27;
                if(val1 < 0){
                    val1 = val1 + 27;
                }
                else if(val2 < 0){
                    val2 = val2 + 27;
                }
                arrayValoresFinales.push(val1, val2);
                console.log('arrayFinal: '+arrayValoresFinales);
                bloque++;
            }


        }
        if(cifradoDescifrado === 1){
            cifrado();
        }
        else{
            let adj = [arrayValK[3], -arrayValK[2], -arrayValK[1], arrayValK[0]];
            let tadj = [adj[0], adj[2], adj[1], adj[3]];  
            let deterK = (arrayValK[0] * arrayValK[3]) - (arrayValK[1] * arrayValK[2]);
            let kMenosUno = [];
            tadj.forEach(value => {
                let valor = value * (28/deterK) % 27;
                if(valor < 0){
                    valor = valor + 27;
                }
                else if(valor > 27){
                    valor = valor % 27;
                }
                kMenosUno.push(valor);
            });

            cifrado(kMenosUno);
            
            console.log('adjunta: '+adj);
            console.log('Transadjunta: '+tadj);
            console.log('determinante: '+deterK);
            console.log('KmenosUno: '+kMenosUno);
        }
       

        let arrayFinal = [];

        arrayValoresFinales.forEach(valormsj => {
            abc.forEach( function (valorabc, indiceabc) {
              if(valormsj === indiceabc){
                arrayFinal.push(valorabc);
              };
            });
          });
      
        let strMsjFinal = arrayFinal.toString().replace(/,/g,''); 
        setMensajeFinal(strMsjFinal); 

        console.log(arrayValoresFinales);
    }

    return(
        <div className="Hill">
            <h1>Cifrado Hill</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Ingresar valores" maxLength={4}/>
                <input type='text' placeholder="Ingresar k" maxLength={4}/>
                <input 
                    id='cifrar'
                    type='radio' 
                    value='1' 
                    checked={cifradoDescifrado == 1 ? true : false}
                    onChange={handleCifrarDescifrar}>
                </input>
                <label >Cifrar</label>
                <input 
                    id='descifrar'
                    type='radio' 
                    value='2' 
                    checked={cifradoDescifrado == 2 ? true : false}
                    onChange={handleCifrarDescifrar}></input>
                <label >Descifrar</label>
                <button type="submit">Submit</button>
            </form>
            <p>{mensajeFinal}</p>
        </div>
    );
}

export default Hill;