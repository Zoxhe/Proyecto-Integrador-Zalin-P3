import React, {Component} from 'react';

class Detalle extends Component{
    constructor(props){ //va a contener la info del estado inicial de un componente y controlar las props
        super(props) //le pasa al componente toda la lógica del component
        this.state = { // this es un objeto literal, state es una propiedad a la cual le asignas un objeto literal con propiedades y valores.
            MesnajeFavoritos: "Agregar a favoritos",

        }
}
    componentDidMount(){
        let favoritos = []; //definimos el array donde vamos a guardar los favs
        let recuperoStorage = localStorage.getItem('favoritos') //accedemos a la info usando getItem --> se retorna un string que giardamos en JSON

        if(recuperoStorage !== null){
            let favsToArray = JSON.parse(recuperoStorage); // para convertir el JSON usamos este metodo que nos retorna un array de los favs para trabajarlo
            favoritos = favsToArray
        }

        if(favoritos.includes(this.props.detalleDatos.id)){
            this.setState({ // permite actualizar la indo del OL de un  componente, cuando se modifica se vuvle a renderizar
                favsMensaje: "Quitar de favoritos"
            })
        }
    }

    agregarYquitarDeFavs(id){
        //Tiene que agegar un id dentro de un Array y guardarlo en localstorage
        // Si el id ya existe ofrecer al usuario la posibilidad de quitar el id del array de favoritos
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos')

        if(recuperoStorage !== null){
            let favsToArray = JSON.parse(recuperoStorage); 
            favoritos = favsToArray

        }

         //Preguntemos si el id ya está en el array.
         if(favoritos.includes(id)){ //includes retorna un booleano.
            favoritos = favoritos.filter(unId => unId !== id);
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
    render(){
        return(
            <article className="detalle-card">
                <h1 className="nombreCancion">{this.props.detalleDatos.title}</h1>
                <img className="imagen"></img>
                <section>
                    <h1 className = "nombreArtista">{this.props.detalleDatos.name}</h1>
                    <h1 className = "nombreAlbum">{this.props.detalleDatos.title}</h1>
                    <p className="boton-detalle" onClick={()=>this.agregarYquitarDeFavs(this.props.detalleDatos.id)}>{this.state.favsMessage}</p>

                </section>
            </article>
        )
    }

}
export default Detalle



