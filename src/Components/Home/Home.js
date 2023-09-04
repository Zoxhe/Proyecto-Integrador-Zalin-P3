import React, { Component } from 'react';

import Buscador from '../Buscador/Buscador';
import Tarjeta from '../Tarjeta/Tarjeta';

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topcanciones : [],
            cnacionesalbum : []
        }
    }

    componentDidMount() {

        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=5')
            .then( response => response.json() )
            .then( datos => {
                this.setState({
                    topcanciones : datos.data
                })

                console.log(datos.data);
            })
            .catch( error => console.log(error) )

        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/302127/tracks&limit=5')
            .then( response => response.json() )
            .then( datos => {
                this.setState({
                    cnacionesalbum : datos.data
                })

                console.log(datos.data);
            })
            .catch( error => console.log(error) )

    }

    render() {
        return(
            <div className="Home">
                <Buscador />

                <a href="">Ver todas</a>
                <section className="canciones">
                    {
                        this.state.topcanciones.map( (cancion, indice) => {
                            return(
                                <Tarjeta key={indice} cover={cancion.album.cover_medium} title={cancion.title} artist_name={cancion.artist.name} />
                            )
                        })
                    }
                </section>
                <a href="">Ver todas</a>
                <section className="canciones_album">
                    {
                        this.state.cnacionesalbum.map( (cancion, indice) => {
                            return(
                                <Tarjeta key={indice} cover={"https://e-cdns-images.dzcdn.net/images/cover/" + cancion.md5_image + "/250x250-000000-80-0-0.jpg"} title={cancion.title} artist_name={cancion.artist.name} />
                            )
                        })
                    }
                </section>

            </div>
        )
    }
}

export default Home;
