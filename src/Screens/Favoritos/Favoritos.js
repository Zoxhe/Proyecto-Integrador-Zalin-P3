import React, { Component } from 'react';

import Buscador from '../../Components/Buscador/Buscador';
import CancionCard from '../../Components/CancionCard/CancionCard';

import './Favoritos.css'


class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
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
            .then( datos => { //lo bque queremos que se ejecute sobre la informacion de la api (ID)
                let listaCanciones = this.state.datos;
                listaCanciones.push(datos);
                this.setState({datos: listaCanciones});
                
            })
            .catch( error => console.log(error) )
        })
    }

    agregarYsacarDeFavs(id) {//si el id esta en el array debe sacarlo y si no esta, debe agregarlo
        
        let favoritos = []; //creamos array favoritos
        let recuperoStorage = localStorage.getItem('favoritos') //buscamos la info del localStorage

        if (recuperoStorage !== null) { //si encontro algo
            let favoritosToArray = JSON.parse(recuperoStorage); //no nos sirve en JSON, lo pasamos a array
            favoritos = favoritosToArray //guardamos eso en el array de favoritos
        }

        //preguntemos si el id ya está en el array o no
        //includes retorna un booleano.
        if (favoritos.includes(id)) {
            //si el id esta en el array, lo queremos SACAR (clase ale)

            //usamos filter para sacar el elemento del array pero nos deja un array nuevo --> guardamos ese aray en la variable favoritos
        
            favoritos = favoritos.filter(unId => unId !== id); 
            
            //Estamos dejando en el array todos los ids que sean diferentes al que estamos usando
            //me queda un array con todos los mismos ids de antes menos el que estamos usando
            //luego mostrar un cambio al usuario en la pantalla: agregar a favoritos
           
            this.setState({
                favsMessage: 'Agregar a favoritos'
            })

        } else { //si el id NO esta en el array, lo agregamos y mostramos un texto diferente
            favoritos.push(id);
            
            this.setState({
                favsMessage: 'Quitar de favoritos'
            })
        }



        let favoritosToString = JSON.stringify(favoritos); //lo convertimos en JSON para pasarlo a localStorage
        localStorage.setItem('favoritos', favoritosToString);

        console.log(localStorage);

    }
    

    render() {
        return(
            this.state.datos != {}?
            <>
                <h1 clasName="Titulo">Favoritos</h1>
                <section className="canciones_album">
                    {this.state.datos.map( (cancion, indice) => {
                            return(
                                <CancionCard redirigir={'unaCancion'} key={indice} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)}  />
                            )
                        })
                    }
                </section>
            </>
            : <p>Cargando...</p>
        )
    }
}

export default Favoritos;