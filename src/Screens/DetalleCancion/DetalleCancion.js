import React, { Component } from 'react';
import './Detalle.css';

class DetalleCancion extends Component {
    constructor(props) { //va a contener la info del estado inicial de un componente y controlar las props
        super(props) //funcion necesaria para poder utilizar las props
        this.state = { // this es un objeto literal, state es una propiedad a la cual le asignas un objeto literal con propiedades y valores.
            favsMessage: "Agregar a favoritos",
            data: null,
            claseTitle: "hide",
        }
    }
    componentDidMount() {

        const id = parseInt(this.props.match.params.id)

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/track/${id}`)
            .then(response => response.json())
            .then(datos => { //escribimos codigo que se va a ejecutar sobre la informacion de la api
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
        } //aca ya se sabe con que id estamos trabajando --> no necesitamos hacer todo lo que se viene

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
            //si el id esta en el array, lo queremos SACAR y mostrar agregar a favs (clase ale)

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
    mostrarYOcultarTitulo(){
        if(this.state.claseTitle == "show") {//si es true la cambio a false
            console.log('es true');
            this.setState({claseTitle: 'hide'}, () => console.log(this.state))
        } else {//si no es true, es porque es false, y la cambio a true
            console.log('es false');
            this.setState({claseTitle: 'show'}, () => console.log(this.state))
        }
    }

    manejarMensaje(){
        console.log(this.state);
        if(this.state.favsMessage == "Agregar a favoritos"){
            this.setState({favsMessage: 'Eliminar de favoritos'})
        } else {
            this.setState({favsMessage: 'Agregar a favoritos'})
        }
    }

    favoritos(id){
        console.log('entro');
        this.manejarMensaje();
        this.props.agregarYsacarDeFavs(id)
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
                                <p className={this.state.claseTitle}> Titulo: {this.state.data.title} </p>
                                <p className={this.state.claseTitle}> Duración: {this.state.data.duration} segundos</p>
                                <p className={this.state.claseTitle}> Ranking: {this.state.data.rank} </p>
                                <button className="link-detalle" onClick={() => this.agregarYsacarDeFavs(this.state.data.id)}>{this.state.favsMessage}</button>
                                <p className= "detalle" onClick={() => this.mostrarYOcultarTitulo()} > {this.state.claseTitle == "show" ? "Ocultar" : "Mostrar mas"} {/* si es true muestro el mensaje de ocultar, si es false muestro el mensaje de mostrar*/ } </p>
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


