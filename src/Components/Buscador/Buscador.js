import React, { Component } from "react";

import Tarjeta from "../CancionCard/CancionCard";

import "./Buscador.css";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      busqueda_lista: false,
      lista_canciones: [],
    };
  }

  handlefetch() {
    fetch(
      `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.state.busqueda}`
    )
      .then((response) => response.json())
      .then((datos) => {
        this.setState({
          lista_canciones: datos.data,
        });
      })
      .catch((error) => console.log(error));
  }

  preventDefault(evento) {
    evento.preventDefault();

    if (this.state.busqueda !== "") {
      this.setState({
        busqueda: evento.target.value,
        busqueda_lista: true,
      });
      this.handlefetch();
    }
  }

  guardarBusqueda(evento) {
    this.setState({
      busqueda: evento.target.value,
    });
  }

  render() {
    return (
      <>
        <form
          onSubmit={(evento) => this.preventDefault(evento)}
          method="GET"
          className="Buscador"
        >
          <input
            onInput={(evento) => this.guardarBusqueda(evento)}
            type="text"
            placeholder="Buscar"
            value={this.state.busqueda}
          />
          <button type="submit">Buscar</button>
        </form>

        {this.state.busqueda_lista ? (
          <>
            <a href="">Ver todas</a>
            <section className="canciones_album">
              {this.state.lista_canciones.map((cancion, indice) => {
                return (
                  <Tarjeta
                    key={indice}
                    data={cancion}
                    // cover={
                    //   "https://e-cdns-images.dzcdn.net/images/cover/" +
                    //   cancion.md5_image +
                    //   "/250x250-000000-80-0-0.jpg"
                    // }
                    // title={cancion.title}
                    // artist_name={cancion.artist.name}
                  />
                );
              })}
            </section>
          </>
        ) : null}
      </>
    );
  }
}

export default Buscador;