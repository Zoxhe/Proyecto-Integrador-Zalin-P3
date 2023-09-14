import React, { Component } from 'react';

import CancionCard from '../../Components/CancionCard/CancionCard';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topCanciones: [],
            cancionesAlbum: []
        }
    }

    componentDidMount() {

        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=5')
            .then(response => response.json())
            .then(datos => {
                this.setState({
                    topCanciones: datos.data
                })
                console.log("CANCIONES")
                console.log(datos.data);
            })
            .catch(error => console.log(error))

        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/albums&top?limit=5')
            .then(response => response.json())
            .then(datos => {
                this.setState({
                    cancionesAlbum: datos.data
                })
                console.log("ALBUM")
                console.log(datos.data);
            })
            .catch(error => console.log(error))

    }

    agregarYsacarDeFavs(id) {
        //si el id esta en el array debe sacarlo y si no esta, debe agregarlo
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos')

        if (recuperoStorage !== null) {
            let favoritosToArray = JSON.parse(recuperoStorage); //no nos sirve cadena de texto
            favoritos = favoritosToArray
        }

        //preguntemos si el id ya está en el array o no
        //includes retorna un booleano.
        if (favoritos.includes(id)) {
            //si el array esta lo queremos sacar (clase ale)
            //luego mostrar un cambio al usuario en la pantalla
            //usamos filter para sacar el elemento del array pero nos deja un array nuevo --> guardamos ese aray en la variable favoritos

            favoritos = favoritos.filter(unId => unId !== id);
            //unId es el parametro
            //mostar al usuario un nuevo texto: agregar a favoritos

            this.setState({
                favsMessage: 'Agregar a favoritos'
            })

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
        return (

            <div className="Home">
                <div className="tituloHome">
                    <h2>CANCIONES</h2>
                    <a className='otro' href="/todasCanciones">Ver todas</a> {/* LINK TO */}
                </div>

                <section className="sectionHome canciones">
                    {this.state.topCanciones.map((cancion, indice) => {
                        { console.log(cancion) }
                        return (
                            <CancionCard redirigir={'unaCancion'} key={indice} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)} />
                        )
                    })
                    }
                </section>
                <div className="tituloHome">
                    <h2>ALBUMS</h2>
                    <h2 className='otro'><Link to="/todosAlbums">Ver todas</Link></h2> {/* LINK TO */}
                    
                </div>

                <section className="sectionHome canciones_album">
                    {
                        this.state.cancionesAlbum.map((album, indice) => {
                            return (
                                <CancionCard redirigir={'unAlbum'} key={indice} data={album} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)} />
                            )
                        })
                    }


                </section>



            </div>

        )
    }
}

export default Home;