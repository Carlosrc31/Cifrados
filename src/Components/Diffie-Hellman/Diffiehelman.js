import react, {useState} from "react";
/* global BigInt */

function Diffiehelman(){

    const [claveInter, setClaveInter] = useState({
        Ka: null,
        Kb: null
    });

    function handleSubmit(event){
        event.preventDefault();
        let p = event.target[0].value;
        let g = event.target[1].value;
        let a = event.target[2].value;
        let b = event.target[3].value;
        
        let apow = BigInt(Math.pow(g,a));
        let bpow = BigInt(Math.pow(g,b));
        
        let A = Number(apow) % p;
        let B = Number(bpow) % p;
        
        let kapow = BigInt(Math.pow(B, a));
        let kbpow = BigInt(Math.pow(A, b));

        let KA = Number(kapow) % p;
        let KB = Number(kbpow) % p;


        //Verificar con números grandes
        console.log(A + ' '+ b + ' ' + p);
        console.log(Math.pow(A,b));
        console.log(KA + ' ' + KB);

        setClaveInter({
            Ka: KA,
            Kb: KB
        });
    }

    return(
        <div className="diffie">
            <h1>Diffie Helman</h1>
            <form onSubmit={handleSubmit}>
                <input type='number' placeholder="Ingresar valor de p"></input>
                <input type='number' placeholder="Ingresar valor de G"></input>
                <input type='number' placeholder="Ingresar valor de a"></input>
                <input type='number' placeholder="Ingresar valor de b"></input>
                <button type="sumbit">Submit</button>
            </form>
            <p>{claveInter.Ka}</p>
            <p>{claveInter.Kb}</p>
        </div>
    );
}

export default Diffiehelman;