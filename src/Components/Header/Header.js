    import React from 'react';
    import {Link} from 'react-router-dom'

    import './Header.css';

    function Header() {
        return(
            <header>
                <h1>Zalin</h1>
                <nav>
                    <ul>
                        <li><Link to = '/' >Home</Link></li> 
                        <li><Link to = '/favoritos'>Favoritos</Link></li>
                        <li><Link to = '/todasCanciones'>Ver todas</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }

    export default Header;
