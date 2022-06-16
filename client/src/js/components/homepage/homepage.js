import React, {Component} from 'react';
import { Container } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navBar/navBar';
import ListeResto from '../listeResto/listeResto';


let theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

export default class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Navbar />
        </ThemeProvider>
        <Container>
          <ListeResto />
        </Container>
      </div>
    );        
  };
};
