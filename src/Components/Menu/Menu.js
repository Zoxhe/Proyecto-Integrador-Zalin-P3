import {Link} from 'react-router-dom';


function Menu(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
            <li><Link to="/cancion">Canciones</Link></li>
        </ul>
    )
}

export default Menu;