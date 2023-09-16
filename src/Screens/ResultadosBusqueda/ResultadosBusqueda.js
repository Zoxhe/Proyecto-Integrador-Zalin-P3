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
            <div className="ResultadosBusqueda">
                <h1>Resultados de la búsqueda</h1>
                <h2>Su búsqueda es: {this.state.busqueda}</h2>
                <ul>
                    {
                        this.state.data === null ?
                        <li>Cargando...</li> :
                        this.state.data.length === 0 ?
                        <li>No hay resultados para su búsqueda</li> :
                        this.state.data.data.map((track, index) => <CancionCard redirigir={'unaCancion'}  key={index} data={track} link={track.id} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)} />)
                    }
                </ul>
            </div>
        )
    }
}

export default ResultadosBusqueda;
