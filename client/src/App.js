import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/oauth/Register';
import Login from './components/oauth/Login';
import Bbswork from './components/bbswork';
import Bbslec from './Routes/Bbslec';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bbswork" component={Bbswork} />
          <Route exact path="/bbslec" component={Bbslec} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
