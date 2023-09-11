import React, { Component } from 'react';

import Buscador from '../../Components/Buscador/Buscador';
import CancionCard from '../../Components/CancionCard/CancionCard';

import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topcanciones : [],
            cancionesalbum : []
        }
    }

    componentDidMount() {

        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&limit=5')
            .then( response => response.json() )
            .then( datos => { this.setState({
                    topcanciones : datos.data
                })

                console.log(datos.data);
            })
            .catch( error => console.log(error) )

        fetch('https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/302127/tracks&limit=5')
            .then( response => response.json() )
            .then( datos => { this.setState({
                    cancionesalbum : datos.data
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
                    {this.state.topcanciones.map( (cancion, indice) => {
                        return(
                            <CancionCard key={indice} data={cancion} />
                            )
                        })
                    }
                </section>
                <a href="">Ver todas</a>
                <section className="canciones_album">
                    {
                        this.state.cancionesalbum.map( (cancion, indice) => {
                            return(
                                <CancionCard key={indice} data={cancion}  />
                            )
                        })
                    }
                </section>

            </div>
        )
    }
}

export default Home;