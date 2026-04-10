import React from 'react';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import NandF from './Layouts/NandF'



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={ <NandF/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
