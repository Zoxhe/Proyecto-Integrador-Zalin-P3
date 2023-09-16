import React, { Component } from "react";
import CancionCard from "../../Components/CancionCard/CancionCard";

import './TodasCanciones.css';
import Filtro from "../../Components/Filtro/Filtro";

class TodasCanciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canciones: [],
      limit: 5,
    };
  }

  fetchSongs() {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=${this.state.limit}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          canciones: data.data,
          cancionesFiltradas: null,
          limit: this.state.limit + 5,
        })
      )
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchSongs();
    //buscamos datos
  }

  showMore() {
    this.fetchSongs();
  }

  filtrar(textoAFiltrar) {//que deje solo las playlist donde el texto al filtrar este incluido en el nommbre --> filter
    let cancionesFiltradas = this.state.canciones.filter((cancion) =>  cancion.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
    
    this.setState({
      cancionesFiltradas: cancionesFiltradas //actualizamos el dato y lo cargamos al estado
    })
  }
  agregarYsacarDeFavs(id) {
    let favoritos = [];
    let recuperoStorage = localStorage.getItem('favoritos')

    if (recuperoStorage !== null) {
        let favoritosToArray = JSON.parse(recuperoStorage); 
        favoritos = favoritosToArray
    }

    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(unId => unId !== id);


        this.setState({
            favsMessage: 'Agregar a favoritos'
        })

    } else {
        favoritos.push(id);

        this.setState({
            favsMessage: 'Quitar de favoritos'
        })
    }



    let favoritosToString = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', favoritosToString);

    console.log(localStorage);

}
  render() {
    return (
      <React.Fragment>
        <h2 className= 'todaslascanciones'>Todas las canciones</h2>

        <Filtro filtrar={(texto) => this.filtrar(texto)} />

        <div>
          {
            this.state.canciones.length > 0 ?
              this.state.cancionesFiltradas === null ?
                this.state.canciones.map((cancion, index) => (
                  <CancionCard redirigir={'unaCancion'} key={index} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)} />
                )) :
                this.state.cancionesFiltradas.map((cancion, index) => (
                  <CancionCard redirigir={'unaCancion'} key={index} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)} />
                )) :
                null
          }
          
          <button onClick={() => this.showMore()}>Mostrar más</button>
        </div>
      </React.Fragment>
    );
  }
}

export default TodasCanciones;