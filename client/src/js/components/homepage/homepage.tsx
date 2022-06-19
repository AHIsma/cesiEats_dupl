import * as React from 'react';
import { Component } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../navBar/navBar';
import ListeResto from '../listeResto/listeResto';
import FilterList from '../filterList/filterList';
import Footer from '../footer/footer';

let theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    }
  },
});

export default class Homepage extends Component {
  render() {
    return (
      <div className="Homepage">
        <ThemeProvider theme={theme}>
          <Navbar />
          <Footer />
        </ThemeProvider>
        <Container>
          <Stack direction="row" spacing={15}>
            <FilterList />
            <ListeResto />
          </Stack>
        </Container>
      </div>
    );        
  }
};
