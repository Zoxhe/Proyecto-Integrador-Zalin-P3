import React from 'react';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import { Route, Switch} from 'react-router-dom';


import './App.css';

function App() {
  return (
    <body>
    <div className="App">
      <Header />
      <h1>My App in React</h1>
      <main>
        
      </main>

      <Home />
      
      
      <Footer />
    </div>
    </body>

  );
}

export default App;
