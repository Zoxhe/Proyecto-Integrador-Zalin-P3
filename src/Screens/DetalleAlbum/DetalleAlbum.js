import React, {Component} from 'react';


class DetalleAlbum extends Component {
    constructor(props){
        super(props)
        this.state = {
            favsMessage: "Agregar a favoritos",
            data: {}
        }
    }
componentDidMount(){

        const id = this.props.match.params.id;

        fetch(`https://thingproxy.freeboard.io/fetch/https://api.deezer.com/album/${id}`)
        .then( response => response.json() )
        .then( datos => { this.setState({
                data : datos
            }, () => console.log(this.state))

        })
        .catch( error => console.log(error) )


        let favoritos = []; //definimos el array donde vamos a guardar los favs
        let recuperoStorage = localStorage.getItem('favoritos') //accedemos a la info usando getItem --> se retorna un string que giardamos en JSON

        if(recuperoStorage !== null){
            let favsToArray = JSON.parse(recuperoStorage); // para convertir el JSON usamos este metodo que nos retorna un array de los favs para trabajarlo
            favoritos = favsToArray
        }

        if(favoritos.includes(id)){
            this.setState({ // permite actualizar la indo del OL de un  componente, cuando se modifica se vuvle a renderizar
                favsMensaje: "Quitar de favoritos"
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
            
           favoritos = favoritos.filter(unId => unId !== id); //id = this.props.data.id
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
    render(){ 
            return(
                this.state.data != {} ?
                <article className="detalle-card">
                    <h1 className="nombreCancion">{this.state.data.title}</h1>
                    {/* <img className="imagen" src={this.state.data.cover_big}></img>
                    <section className="info-detalle">
                        <h1 className = "nombreArtista"> Artista:{this.state.data.artist.name}</h1>
                        <ul>
                            <h3 clasName="CancionesAlbum">Canciones del Album:</h3>
                            {
                                this.state.data.tracks.data.map((track, indice) => {
                                    return (
                                    <li>
                                        <h5 className="CancionesAlbum">{++indice}{track.title}{track.artist.name}({track.duration})
                                        <iframe src={track.preview}/></h5>

                                    </li>)
    })
                            }
                        </ul>
                        <h1 className="link" onClick={()=>this.agregarYsacarDeFavs(this.state.data.id)}>{this.state.favsMessage}</h1>
                        
                    </section> */}
                </article>
                : <p>Cargando...</p>
            ) 
    }
}
export default DetalleAlbum




