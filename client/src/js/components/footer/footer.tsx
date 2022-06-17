import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import { Container } from '@mui/material';

const Footer = () => {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
        <Container>
            <Stack direction="row" spacing={40}>
                <Typography variant="h6">Team cesiEats 2022</Typography>
                <Link href="#" color="inherit">Mentions légales</Link>
                <Link href="#" color="inherit">Contact</Link>
            </Stack>
        </Container>
        </Toolbar>
      </AppBar>
    )
};
export default Footer;