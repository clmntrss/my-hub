import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from './hoc';

import Header from './components/Header';
import Home from './pages/Home';
import './App.css';
import YoutubeDownloader from './pages/YoutubeDownloader';
import YoutubeSearch from './pages/YoutubeSearch';
import LibraryGenesis from './pages/LibraryGenesis';
import Pomodoro from './pages/Pomodoro';
import Evernote from './pages/Evernote';

const Main = () => (
  <section>
    <Switch>
      <Route exatch path="/youtube-downloader">
        <YoutubeDownloader />
      </Route>
      <Route exact path="/youtube-search">
        <YoutubeSearch />
      </Route>
      <Route exact path="/lib-gen">
        <LibraryGenesis />
      </Route>
      <Route exact path="/pomodoro">
        <Pomodoro />
      </Route>
      <Route exact path="/evernote">
        <Evernote />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">Route not found</Route>
    </Switch>
  </section>
);

const App = () => (
  <div className="App">
    <Header />
    <Main />
  </div>
);

export default withRouter(App);
