import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/home-page';
import PersonDetails from './Pages/personDetails-page';
import AddPerson from './Pages/addPerson-page';
import EditPerson from './Pages/editPerson-page';
import Error404 from './Pages/error-page';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        	<Header />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Person" component={Home} />
              <Route path="/person/new" component={AddPerson} />
              <Route exact path="/Person/:id" component={PersonDetails} />
              <Route path="/Person/:id/edit" component={EditPerson} />
              <Route component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
