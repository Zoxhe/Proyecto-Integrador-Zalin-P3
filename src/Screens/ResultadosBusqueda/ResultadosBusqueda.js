import React, { Component } from 'react';

import CancionCard from '../../Components/CancionCard/CancionCard';

import './ResultadosBusqueda.css';

class ResultadosBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: '',
            data: null
        }
    }

    componentDidMount() {
        this.setState({
            busqueda: this.props.match.params.busqueda
        })

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.props.match.params.busqueda}`)
            .then(response => response.json())
            .then(datos => {
                this.setState({
                    data: datos
                })
            })
            .catch(error => console.log(error))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.busqueda !== this.props.match.params.busqueda) {
            this.setState({
                busqueda: this.props.match.params.busqueda
            })

            fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/search?q=${this.props.match.params.busqueda}`)
                .then(response => response.json())
                .then(datos => {
                    this.setState({
                        data: datos
                    })
                })
                .catch(error => console.log(error))
        }

    }

    render() {
        return (
            <div className="ResultadosBusqueda">
                <h1>Resultados de la búsqueda</h1>
                <h2>Su búsqueda es: {this.state.busqueda}</h2>
                <ul>
                    {
                        this.state.data === null ?
                        <li>Cargando...</li> :
                        this.state.data.length === 0 ?
                        <li>No hay resultados para su búsqueda</li> :
                        this.state.data.data.map((track, index) => <CancionCard key={index} data={track} />)
                    }
                </ul>
            </div>
        )
    }
}

export default ResultadosBusqueda;