import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import Landing from './Landing';
import Navigation from './Navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreatePlayer from './CreatePlayer';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
// import Search from './Search'
import PlayerList from './PlayerList';
import Player from './Player';
import TeamList from './TeamList';
import Team from './Team';
import News from './News';
import Standings from './Standings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
        </div>
        <Route exact path="/" component={Landing} />

        <Route path='/players' component={PlayerList} />
        <Route exact path="/player/:id" component={Player} />
        <Route exact path="/teams" component={TeamList} />
        <Route exact path="/team/:id" component={Team} />
        <Route exact path="/news/:country" component={News} />
        <Route exact path="/standings/:id" component={Standings} />
        
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/createplayer" component={CreatePlayer} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </AuthProvider>
  );
}

export default App;
