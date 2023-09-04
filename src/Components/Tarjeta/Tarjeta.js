import React, { Component } from "react";

import "./Tarjeta.css";

class Tarjeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return(
            <div className="Cancion">
                <img src={this.props.cover} alt={this.props.title} />
                <h3>{this.props.title}</h3>
                <p>{this.props.artist_name}</p>
            </div>
        )
    }

}


export default Tarjeta;
