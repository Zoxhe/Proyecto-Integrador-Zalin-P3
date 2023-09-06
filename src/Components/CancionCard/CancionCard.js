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

    render() {
        return( // para agrupar elementos usamos...
            <React.Fragment>
            <article className="Cancion">
                <img src={this.props.cover} alt={this.props.title} />
                <h3>{this.props.title}</h3>
                <p>{this.props.artist_name}</p>
                <p className="link" onClick={()=>this.agregarYquitarDeFavs(this.props.id)}>{this.state.favsMessage}</p>
                
                
            </article>
            </React.Fragment>
        )
    }

}


export default CancionCard;
