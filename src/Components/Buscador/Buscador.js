import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Buscador.css";

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
    };
  }

  limpiarBusqueda() {
    this.setState({
      busqueda: "",
    });
  }

  guardarBusqueda(evento) {
    this.setState({
      busqueda: evento.target.value,
    });
  }

  render() {
    return (
      <>
        <form className="Buscador">
          <input onInput={(evento) => this.guardarBusqueda(evento)} type="text" placeholder="Buscar" value={this.state.busqueda} />
          <Link to={"/resultados-busqueda/" + this.state.busqueda}><button onClick={() => this.limpiarBusqueda()}>Buscar</button></Link>
        </form>
      </>
    );
  }
}

export default Buscador;