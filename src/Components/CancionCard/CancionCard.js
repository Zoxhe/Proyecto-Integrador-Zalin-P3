import React, { Component } from "react";
import "./CancionCard.css";

class CancionCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favsMessage: "Agregar a favoritos",
            boton: false, 
        };
    }
    componentDidMount(){
        let favoritos = [];
        let recuperoStorage = localStorage.getItem('favoritos')

        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray
        }

        if(favoritos.includes(this.props.datosPeli.id)){
            this.setState({
                favsMessage: 'Quitar de favoritos'
            })
        }
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
  
            <article className="Cancion">
                <img src={this.props.cover} alt={this.props.title} />
                <h3>{this.props.title}</h3>
                <p>{this.props.name}</p>
                <p className="link" onClick={()=>this.agregarYsacarDeFavs(this.props.id)}>{this.state.favsMessage}</p>
                
                
            </article>
            
        )
    }

}


export default CancionCard;
