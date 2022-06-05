import react, {useState} from "react";

function Vignere(){

    const [valoresVignere, setValoresVignere] = useState({
      mensajeClaro: '',
      claveK: '',
    });  
    const [mensajeFinal, setMensajeFinal] = useState('');
    const [cifradoDescifrado, setCifradoDescifrado] = useState(1);  

      //Se agrega a un nuevo array con el valor ya modificado después de sumar mod k
    function handleCifrarDescifrar (event){
      setCifradoDescifrado(event.target.value);
    }   

    function handleInput(event){
      setValoresVignere({
        ...valoresVignere,
        [event.target.name]: event.target.value
      });
    }

    function handleSubmit(event){
        event.preventDefault();   
        //Se define el abecedario
        let abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];  
        
        //Guarda valores con el nuevo mensaje
        let arrayValMsj = []; 
        //Se genera un array de la cadena original
        let arrayMsj = Array.from(valoresVignere.mensajeClaro.toLowerCase());  
        
        //Guarda valores con k
        let arrayValK = []; 
        //Se genera un array de k
        let arrayK = Array.from(valoresVignere.claveK.toLowerCase());  

        //Para repetir la cadena en caso de que falten carácteres
        let i=0;
        while(arrayMsj.length > arrayK.length){
            arrayK.push(arrayK[i]);
            i += 1;
        }

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

    //Nuevos valores agregando el valor del módulo de k
    let newMsj = [];  
    //Se procede a hacer el algoritmo de cifrado o descifrado
    if(cifradoDescifrado == 1){
      arrayValMsj.forEach( function (valormsj,index){
          let newValue = (valormsj + arrayValK[index]) % 27;
          while(newValue > 27){
            newValue = newValue % 27;
          }
          newMsj.push(newValue);
          }
      )
    } 
    else{
      arrayValMsj.forEach( function (valormsj, index){
            let newValue = (valormsj - arrayValK[index]) % 27;
            while(newValue < 0){
              newValue = newValue + 27;
            }
            newMsj.push(newValue);
        });
    } 

    let arrayFinal = [];  
    //Se compara y dado el valor se le asigna la nueva letra del alfabeto
    newMsj.forEach(valormsj => {
      abc.forEach( function (valorabc, indiceabc) {
        if(valormsj === indiceabc){
          arrayFinal.push(valorabc);
        };
      });
    });

    let strMsjFinal = arrayFinal.toString().replace(/,/g,''); 
    setMensajeFinal(strMsjFinal); 

    };    
    
    return (
        <div className="App">
          <h1>Cifrado Vignere</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type='text' 
              placeholder='Ingresar valores' 
              name='mensajeClaro'
              onChange={handleInput}
              >  
              </input>
            <input 
              type='text' 
              placeholder='Valor de k' 
              name='claveKM'
              onChange={handleInput}
              >
              </input>
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
            <button type='submit'>Submit</button>
          </form>
          <p>{mensajeFinal}</p>
        </div>
    );
};

export default Vignere;

