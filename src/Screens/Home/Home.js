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
        return(
            
            <div className="Home">
                <Buscador />

                <a href="">Ver todas</a>
                <section className="canciones">
                    {this.state.topcanciones.map( (cancion, indice) => {
                        return(
                            <CancionCard key={indice} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)} />
                            )
                        })
                    }
                </section>
                <a href="">Ver todas</a>
                <section className="canciones_album">
                    {
                        this.state.cancionesalbum.map( (cancion, indice) => {
                            return(
                                <CancionCard key={indice} data={cancion} agregarYsacarDeFavs={(id) => this.agregarYsacarDeFavs(id)}  />
                            )
                        })
                    }
                    
                </section>
                
                

            </div>
            
        )
    }
}

export default Home;