import React, { Component } from 'react';

import './DetalleAlbum.css';

class DetalleAlbum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favsMessage: "Agregar a favoritos",
            data: null,
            claseTitle: "hide",
        }
    }
    componentDidMount() {

        const id = this.props.match.params.id; //capturando la info que viaja por la ruta parametrizada

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${id}`)
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
            let favsToArray = JSON.parse(recuperoStorage); // para convertir el JSON usamos este metodo que nos retorna un array de los favs para trabajarlo
            favoritos = favsToArray
        }

        if (favoritos.includes(id)) {
            this.setState({ // permite actualizar la info del OL de un  componente, cuando se modifica se vuvle a renderizar
                favsMensaje: "Quitar de favoritos"
            })
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
                    <article className="detalle-album-card">
                        <div className='detalle-album-left'>
                            <h1 className="nombreCancion">{this.state.data.title}</h1>
                            <img className="imagen-detalle-album" src={this.state.data.cover_big} alt="" />
                        </div>
                        <div className='detalle-album-right'>
                            <section className="info-detalle">
                                <h1 className="nombreArtista">Artista: {this.state.data.artist.name}</h1>
                                <p className={this.state.claseTitle}> <ul className="textoDetalle">
                                    {
                                        this.state.data.tracks.data.map((track, i) => <li key={track.id + i}>{track.title}</li>)
                                    }
                                </ul> </p>
                                
                                <button className="link-detalle" onClick={() => this.agregarYsacarDeFavs(this.state.data.id)}>{this.state.favsMessage}</button>
                                <p className= "detalle" onClick={() => this.mostrarYOcultarTitulo()} > {this.state.claseTitle == "show" ? "Ocultar" : "Mostrar mas"} {/* si es true muestro el mensaje de ocultar, si es false muestro el mensaje de mostrar*/ } </p>
                            </section>
                        </div>
                    </article> :
                    <p>Cargando...</p>
                }
            </>
        )
    }
}
export default DetalleAlbum




