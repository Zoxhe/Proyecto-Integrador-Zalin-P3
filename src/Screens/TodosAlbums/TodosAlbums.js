import React, { Component } from "react";
import CancionCard from "../../Components/CancionCard/CancionCard";

import './TodosAlbums.css';
import Filtro from "../../Components/Filtro/Filtro";

class TodosAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      limit: 5,
    };
  }

  fetchAlbums() {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums&limit=${this.state.limit}`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          albums: data.data,
          albumsFiltrados: null,
          limit: this.state.limit + 5,
        })
      )
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.fetchAlbums();
    //buscamos datos
  }

  showMore() {
    this.fetchAlbums();
  }

  filtrar(textoAFiltrar) {//que deje solo las playlist donde el texto al filtrar este incluido en el nommbre --> filter
    let albumsFiltrados = this.state.albums.filter((album) =>  album.title.toLowerCase().includes(textoAFiltrar.toLowerCase()))
    
    this.setState({
      albumsFiltrados: albumsFiltrados //actualizamos el dato y lo cargamos al estado
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
        <h2 className= 'todaslascanciones'>Todos los Albums</h2>

        <Filtro filtrar={(texto) => this.filtrar(texto)} />

        <section>
          {
            this.state.albums.length > 0 ?
              this.state.albumsFiltrados === null ?
                this.state.albums.map((album, index) => (
                  <CancionCard redirigir={'unAlbum'} key={index} data={album} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)}/>
                )) :
                this.state.albumsFiltrados.map((album, index) => (
                  <CancionCard redirigir={'unAlbum'} key={index} data={album} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)}/>
                )) :
                null
          }
          
          <button onClick={() => this.showMore()}>Mostrar más</button>
        </section>
      </React.Fragment>
    );
  }
}

export default TodosAlbums;