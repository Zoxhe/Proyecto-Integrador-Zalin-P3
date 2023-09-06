import React from 'react';
import Header from './Components/Header/Header';
import Home from './Screens/Home/Home';
import Footer from './Components/Footer/Footer';
import Favoritos from './Screens/Favoritos/Favoritos';
import { Route, Switch} from 'react-router-dom';
import Menu from './Components/Menu/Menu';


import './App.css';

function App() {
  return (
    <React.Fragment>
      <Menu />
      <Switch>
        <Route path="/" exact = {true} component={Home}/>
        <Route path="/favoritos" component={Favoritos}/>
        <Route path="/cancion" component={CancionCard}/> 
        
    </Switch>
   </React.Fragment>
    

  );
}

export default App;
