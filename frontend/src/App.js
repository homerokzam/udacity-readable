import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import createBrowserHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Header from './Component/Header';
import Root from './Component/Root/Root';
import Posts from './Component/Posts/Posts';
import Category from './Component/Category/Category';
import Detail from './Component/Detail/Detail';

const history = createBrowserHistory();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <main>
          <BrowserRouter >
            <div>
              <Route exact path='/' component={Root} />
              <Route path='/posts/:id' component={Posts} />
              <Route path='/category/:id' component={Category} />
              <Route path='/detail/:id' component={Detail} />
            </div>
          </BrowserRouter>
        </main>
      </MuiThemeProvider>
    );
  }
}

export default App;