import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import createBrowserHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';

import Header from './Component/Header';
import Category from './Component/Category/Category';
import Detail from './Component/Detail/Detail';
import Home from './Component/Home';
import PostDetail from './Component/Post/PostDetail';
import Messages from './Helpers/Messages';
import PostAdd from './Component/Post/PostAdd';

const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  },
  link: {
    textDecoration: 'initial',
    color: 'inherit',
  },
  drawerWidth: 240,
});

const styles = {
  root: {
    display: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
    },
  },
  loading: {
    position: 'absolute',
    width: '100%',
    top: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
  },
  toolbar: theme.mixins.toolbar,
};

class App extends Component {
  render() {
    //const { classes } = this.props;
    //console.log(classes);

    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <main>
          <BrowserRouter >
            <div>
              <Route exact path='/' component={Home} />
              {/* <Route path='/posts/:id' component={PostDetail} /> */}
              <Route path='/posts/:id' render={(props) => (<PostDetail { ...props } />)} />
              <Route path='/category/:id' component={Category} />
              <Route path='/detail/:id' component={Detail} />
              <Route path='/newPost' component={PostAdd} />
            </div>
          </BrowserRouter>
        </main>
        <Messages />
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);