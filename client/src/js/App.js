import * as React from 'react';
import { Container } from '@mui/system';
import Navbar from './components/navBar/navBar';
import ListeResto from './components/listeResto/listeResto';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilterSidebar from './components/filterList/filterList';


let theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
});

export default function App() {
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
}