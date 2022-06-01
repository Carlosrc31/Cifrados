import react from "react";
import Cesar from './Components/Cesar/Cesar';
import Vignere from './Components/Vignere/Vignere';
import Diffiehelman from './Components/Diffie-Hellman/Diffiehelman';
import Hill from './Components/Hill/Hill';
import RSA from './Components/RSA/RSA';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

function App(){
    return(
        <Router>
            <NavLink to="/">
                Inicio
            </NavLink>
            <NavLink to="/cesar">
                Cesar
            </NavLink>
            <NavLink to="/vignere">
                Vignere
            </NavLink>
            <NavLink to="/hill">
                Hill
            </NavLink>
            <NavLink to="/diffie">
                Diffie-Hellman
            </NavLink>
            <NavLink to="/rsa">
                RSA
            </NavLink>
            <Routes>
                <Route path="/" exact element={<div>Pagina de Inicio de Cifrados</div>}/>
                <Route path="/cesar" exact element={<Cesar/>} />
                <Route path="/vignere" exact element={<Vignere />}/>
                <Route path="/hill" exact element={<Hill />}/>
                <Route path="diffie" exact element={<Diffiehelman />}/>
                <Route path="/rsa" exact element={<RSA />}/>
            </Routes>
        </Router>
    );
}

export default App;