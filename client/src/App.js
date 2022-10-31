import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


function App() {


  return (
    <GoogleOAuthProvider clientId="538510831844-if2nu3p3ujl2rrcujku72rst7j05d9ll.apps.googleusercontent.com">
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/auth" exact component={Auth}/>
        </Switch>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>


  )
}



export default App
