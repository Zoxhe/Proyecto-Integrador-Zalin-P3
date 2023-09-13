import React, { Component } from "react";
import CancionCard from "../../Components/CancionCard/CancionCard";
import Filtro from "../../Components/Filtro/Filtro";

class TodasCanciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canciones: [],
    };
  }

  componentDidMount() {
    //buscamos datos
    fetch(
      "https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=5"
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          canciones: data.data,
        })
      )
      .catch((error) => console.log(error));
  }

  // filtrar(textoAFiltrar){//que deje solo las playlist donde el texto al filtrar este incluido en el nommbre --> filter
  //     let playListsFiltradas = this.state.playList.filter(function(unaPlayList){
  //         return textoAFiltrar.includes(unaPlayList.title)
  //     })
  //     this.setState({
  //         playList: playListsFiltradas //actualizamos el dato y lo cargamos al estado
  //     })
  // }

  render() {
    console.log(this.setState.playList);
    return (
      <React.Fragment>
        <h2>Todas las canciones</h2>
        {/* <Filtro filtrar={(texto) => this.filtrar(texto)} /> */}
        <section>
          {this.state.canciones.map((cancion, index) => (
            <CancionCard key={index} data={cancion} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default TodasCanciones;