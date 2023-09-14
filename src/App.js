import React from 'react';
  import Header from './Components/Header/Header';
  import Home from './Screens/Home/Home';
  import Footer from './Components/Footer/Footer';
  import Favoritos from './Screens/Favoritos/Favoritos';
  import {Route, Switch} from 'react-router-dom';
  import DetalleCancion from './Screens/DetalleCancion/DetalleCancion';
  import NotFound from './Screens/NotFound/NotFound'
  import PlayList from './Screens/PlayList/PlayList';
  import DetalleAlbum from './Screens/DetalleAlbum/DetalleAlbum'
  import './App.css';
  import TodasCanciones from './Screens/TodasCanciones/TodasCanciones';
  import TodosAlbums from './Screens/TodosAlbums/TodosAlbums';
  import ResultadosBusqueda from './Screens/ResultadosBusqueda/ResultadosBusqueda';
  import Buscador from './Components/Buscador/Buscador';


  function App() {
    return (
      <React.Fragment>
        <Header/>
        <Buscador/>
        <Switch>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/favoritos" exact={true} component={Favoritos}/>
          <Route path='/unaCancion/id/:id'  component={DetalleCancion}/>
          <Route path='/unAlbum/id/:id'  component={DetalleAlbum}/>
          <Route path='/todasCanciones' component={TodasCanciones}/>
          <Route path='/todosAlbums' component={TodosAlbums}/>
          <Route path='/resultados-busqueda/:busqueda' component={ResultadosBusqueda}/>
          <Route path='/playlist' component={PlayList}/>
          <Route path='' component={NotFound} />
      </Switch>
      <Footer/>
    </React.Fragment>
      

    );
  }

  export default App;