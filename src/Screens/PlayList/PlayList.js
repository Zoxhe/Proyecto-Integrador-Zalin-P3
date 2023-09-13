import React, { Component } from 'react';
import CancionCard from '../../Components/CancionCard/CancionCard';
import Filtro from '../../Components/Filtro/Filtro';

class PlayList extends Component{
    constructor(props){
        super(props)
        this.state={
            page: 1,
            playList: [],
            
        }
        
    }
 
componentDidMount(){
    //buscamos datos
    fetch("https://api.deezer.com/playlist?q=${this.state.page}")
    .then( res => res.json())
    .then( data => this.setState({
                playList: data.results,
                page:this.state.page+1
            }))
            .catch( error => console.log(error) )
    }

filtrar(textoAFiltrar){//que deje solo las playlist donde el texto al filtrar este incluido en el nommbre --> filter
    let playListsFiltradas = this.state.playList.filter(function(unaPlayList){
        return textoAFiltrar.includes(unaPlayList.title)
    })
    this.setState({
        playList: playListsFiltradas //actualizamos el dato y lo cargamos al estado
    })
}


render(){
    console.log(this.setState.playList)
    return(
        <React.Fragment>
        <h2 >PlayLists</h2>
        <Filtro filtrar={(texto) => this.filtrar(texto)}/>
        <section> 
            {  
                this.state.playList.map(
                    (playlist,index) => <CancionCard key={playlist + index} datosPlayList={playlist}/>
                )
            }
        </section>
        
        </React.Fragment>
    )
}
}

export default PlayList;
