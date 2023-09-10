import React, { Component } from 'react';

import Buscador from '../../Components/Buscador/Buscador';
import CancionCard from '../../Components/CancionCard/CancionCard';

import './Favoritos.css'


class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: []
        }
    }

    componentDidMount() {

        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos')

        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray
            console.log(favoritos);
        }
        console.log(favoritos);
        favoritos.map((id) => {
            fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${id}`)
            .then( response => response.json() )
            .then( datos => { 
                let listaCanciones = this.state.datos;
                listaCanciones.push(datos);
                this.setState({datos: listaCanciones});
            })
            .catch( error => console.log(error) )
        })
    }

    agregarYsacarDeFavs(id){
        //si el id esta en el array debe sacarlo y si no esta, debe agregarlo
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos')

        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage); //no nos sirve cadena de texto
            favoritos = favoritosToArray
        }

        //preguntemos si el id ya está en el array o no
        //includes retorna un booleano.
        if(favoritos.includes(id)){
           //si el array esta lo queremos sacar (clase ale)
           //luego mostrar un cambio al usuario en la pantalla
           //usamos filter para sacar el elemento del array pero nos deja un array nuevo --> guardamos ese aray en la variable favoritos
            
           favoritos = favoritos.filter(unId => unId !== id); 
            //unId es el parametro
            //mostar al usuario un nuevo texto: agregar a favoritos

            if (this.props.borrar) {this.props.borrar(id)
            } else {
                this.setState({
                    favsMessage: 'Agregar a favoritos'
                })
            }
        } else {
            favoritos.push(id);
            //mostar un texto diferente al usuario. Quitar de favs
            this.setState({
                favsMessage: 'Quitar de favoritos'
            })
        }



        let favoritosToString = JSON.stringify(favoritos);
        localStorage.setItem('favoritos', favoritosToString);

        console.log(localStorage);

    }
    

    render() {
        return(
            <>
                <h1>Favoritos</h1>
                <section className="canciones_album">
                    {
                        this.state.datos.map( (cancion, indice) => {
                            return(
                                <CancionCard key={indice} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)}  />
                            )
                        })
                    }
                </section>
            </>
        )
    }
}

export default Favoritos;