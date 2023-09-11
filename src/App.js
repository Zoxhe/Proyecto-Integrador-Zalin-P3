import React from 'react';
import Header from './Components/Header/Header';
import Home from './Screens/Home/Home';
import Footer from './Components/Footer/Footer';
import Favoritos from './Screens/Favoritos/Favoritos';
import { Route, Switch} from 'react-router-dom';
import Detalle from './Screens/Detalle/Detalle';
import NotFound from './Screens/NotFound/NotFound'
import './App.css';

function App() {
  return (
    <React.Fragment>
      
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/favoritos" exact={true} component={Favoritos}/>
        
        <Route path='/unaCancion/id/:id'  component={Detalle}/>

        <Route path='' component={NotFound} />
    </Switch>
   </React.Fragment>
    

  );
}

export default App;

