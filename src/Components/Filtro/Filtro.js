import React, { Component } from 'react';

class Filtro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valor: ''
        }
    }

    controlarEnvio(event) {
        event.preventDefault();
        return true
    }

    guardarDatosDelInput(eventoEnCampoInput) {
        this.setState({
            valor: eventoEnCampoInput.target.value //agarrar el valor que pusieron en el input
        }, () => this.props.filtrar(this.state.valor)) //"lo q quieras ejecutar, ejecutalo como segundo parametrp de setState. hacemos esto para estar seguros que el estado esta actualizado
        //jecutamos el metodo filtrar una vez que el estado esta actualizado

        // console.log(this.state.valor);
        return true
    }

    render() { //la e representa el evento submit
        //console.log(this.props);
        return (
            <>
                {
                    this.state.valor != {} ?
                        <div className="formDeBusqueda">
                            <form className="filter" action="" method='GET' onSubmit={(e) => this.controlarEnvio(e)}>
                                <input className="search" name="filtro" type="text" placeholder="texto a filtrar" onChange={(e) => this.guardarDatosDelInput(e)} value={this.state.valor} />
                                <button className="bottonsearch" type='button'>Filtrar</button>
                            </form>
                        </div>
                        : <p>Cargando...</p>
                }
            </>
        )
    }

}

export default Filtro