import React, { Component } from 'react';
import './Detalle.css';

class DetalleCancion extends Component {
    constructor(props) { //va a contener la info del estado inicial de un componente y controlar las props
        super(props) //le pasa al componente toda la lógica del component
        this.state = { // this es un objeto literal, state es una propiedad a la cual le asignas un objeto literal con propiedades y valores.
            favsMessage: "Agregar a favoritos",
            data: null,
        }
    }
    componentDidMount() {

        const id = parseInt(this.props.match.params.id)

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${id}`)
            .then(response => response.json())
            .then(datos => {
                this.setState({
                    data: datos
                }, () => console.log(this.state))

            })
            .catch(error => console.log(error))


        let favoritos = []; //definimos el array donde vamos a guardar los favs
        let recuperoStorage = localStorage.getItem('favoritos') //accedemos a la info usando getItem --> se retorna un string que giardamos en JSON

        if (recuperoStorage !== null) {
            favoritos = JSON.parse(recuperoStorage); // para convertir el JSON usamos este metodo que nos retorna un array de los favs para trabajarlo
        }

        if (favoritos.includes(id)) {
            this.setState({ // permite actualizar la indo del OL de un  componente, cuando se modifica se vuvle a renderizar
                favsMessage: 'Quitar de favoritos'
            }, console.log(this.state.favsMessage))
        }

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

            if (this.props.borrar) {
                this.props.borrar(id)
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
        return (
            <>
            {
                this.state.data !== null ?
                    <article className="detalle-cancion-card">
                        <div className='detalle-cancion-left'>                       
                            <h1 className="nombreCancion">{this.state.data.title}</h1>
                            <img className="imagen-detalle-cancion" src={"https://e-cdns-images.dzcdn.net/images/cover/" + this.state.data.md5_image + "/250x250-000000-80-0-0.jpg"} alt=""/>
                        </div>
                        <div className='detalle-cancion-right'> 
                            <section>
                                <h1 className="nombreArtista">{this.state.data.name}</h1>
                                <h1 className="nombreAlbum">{this.state.data.title}</h1>
                                <button className="link-detalle" onClick={() => this.agregarYsacarDeFavs(this.state.data.id)}>{this.state.favsMessage}</button>
                            </section>
                            <audio controls>
                                <source src={this.state.data.preview} type="audio/mpeg" />
                            </audio>
                        </div>

                    </article>
                    : <p className='cargando'>Cargando...</p>
            }
            </>
        )
    }
}
export default DetalleCancion


