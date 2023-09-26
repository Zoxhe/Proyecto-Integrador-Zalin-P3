    import React, { Component } from "react";
    import "./CancionCard.css";
    import { Link } from "react-router-dom/cjs/react-router-dom.min";

    class CancionCard extends Component {
        constructor(props) {
            super(props);
            this.state = {
                favsMessage: "Agregar a favoritos",
                boton: false, 
                claseTitle: "hide"
            };
        }
        componentDidMount(){
            let favoritos = [];
            let recuperoStorage = localStorage.getItem('favoritos') // buscamos la info de favoritos que esta en local storage pq ya definimos la funcion de agregar a favoritos en otro lado y la info se guardo

            if(recuperoStorage !== null){ //encontro algo
                let favoritosToArray = JSON.parse(recuperoStorage); //
                favoritos = favoritosToArray
            }

            if(favoritos.includes(this.props.data.id)){
                this.setState({
                    favsMessage: 'Eliminar de favoritos'
                })
            }
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
            console.log(id)
            this.manejarMensaje();
            this.props.agregarYsacarDeFavs(id)
        }

    render() {
            return( 
    
                <article className="cancion">
                    <Link to={`/${this.props.redirigir}/id/${this.props.data.id}`} className="links">
                        <img className="cover" src={"https://e-cdns-images.dzcdn.net/images/cover/" + this.props.data.md5_image + "/250x250-000000-80-0-0.jpg"} alt={this.props.data.title_short} />
                    </Link>
                    <h3>{this.props.data.title}</h3>
                    <p>{this.props.data.name}</p>
                    <p className={this.state.claseTitle}> Titulo: {this.props.data.title} </p>
                    <p className={this.state.claseTitle}> Duración: {this.props.data.duration} segundos</p>
                    <p className={this.state.claseTitle}> Ranking: {this.props.data.rank} </p>
                    <button className="link" onClick={()=>this.favoritos(this.props.data.id)}>{this.state.favsMessage}</button>
                
                    <Link to={`/${this.props.redirigir}/id/${this.props.data.id}`}><p className= "detalle" >Ver detalle</p></Link>
                     {/**/}<p className= "detalle" onClick={() => this.mostrarYOcultarTitulo()} > {this.state.claseTitle == "show" ? "Ocultar" : "Mostrar mas"} {/* si es true muestro el mensaje de ocultar, si es false muestro el mensaje de mostrar*/ } </p>
                </article>
                
            )
        }

    }


    export default CancionCard;
