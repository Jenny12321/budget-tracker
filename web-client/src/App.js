import React, { Component } from 'react';
import './App.css';
import { AuthProvider } from './Auth';
import AuthenticatedRoute from './components/utils/AuthenticatedRoute';
import Home from './components/scripts/Home';
import LoginForm from './components/scripts/Authentication/LoginForm';
import RegistrationForm from './components/scripts/Authentication/RegistrationForm';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faMoneyBillWave, faLayerGroup, faUserCircle, faSlidersH, faHistory, faTrash, faEdit, faUtensils, faCarSide, faShoppingBasket, faFirstAid, faTheaterMasks, faFileInvoiceDollar, faSearchDollar, faSearch, faChevronRight, faChevronCircleRight, faChevronLeft, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faMoneyBillWave, faLayerGroup, faUserCircle, faSlidersH, faHistory, faTrash, faEdit, faUtensils, faCarSide, faShoppingBasket, faFirstAid, faTheaterMasks, faFileInvoiceDollar, faSearchDollar, faSearch, faChevronRight, faChevronCircleRight, faChevronLeft, faChevronCircleLeft);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Route exact path='/'><Redirect to='/login' /></Route>
            <AuthenticatedRoute path="/authenticated" component={Home} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={RegistrationForm} />
          </div>
        </Router>
      </AuthProvider>
    )
  }
}


export default App;
