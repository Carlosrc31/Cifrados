import './Cesar.css';
import React, {useState} from 'react';

function Cesar() {

  const [valoresCesar, setValoresCesar] = useState({
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
    setValoresCesar({
      ...valoresCesar,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event){
    event.preventDefault();

    //Se define el abecedario
    let abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

    //Valor de k con módulo 27
    let modK = valoresCesar.claveK % 27;

    //Guarda valores con el nuevo mensaje
    let arrayValMsj = [];

    //Se genera un array de la cadena original
    let arrayMsj = Array.from(valoresCesar.mensajeClaro.toLowerCase());

    // Se compara con que letra coincide de nuestro alfabeto y se le da el valor
    arrayMsj.forEach(valormsj => {
      abc.forEach(valorabc => {
        if(valormsj === valorabc){
          arrayValMsj.push(abc.indexOf(valormsj));
        }
      });
    });

    //Nuevos valores agregando el valor del módulo de k
    let newMsj = [];

    //Se procede a hacer el algoritmo de cifrado o descifrado
    if(cifradoDescifrado == 1){
      arrayValMsj.forEach(valormsj => {
        let newValue = valormsj + modK;
        while(newValue > 27){
          newValue = newValue % 27;
        }
        newMsj.push(newValue);
      });
    } 
    else{
      arrayValMsj.forEach(valormsj => {
      let newValue = valormsj - modK;
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
      <h1>Cifrado César</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='Ingresar valores' 
          name='mensajeClaro'
          onChange={handleInput}
          >
        </input>
        <input 
          type='number' 
          placeholder='Valor de K' 
          name='claveKM'
          onChange={handleInput}>
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
}

export default Cesar;
