import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from '@mui/material';
import { Container } from '@mui/material';

const Footer = () => {
    return (
        <Container>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Stack direction="row" spacing={10}>
                        <Typography variant="h6">Team cesiEats 2022</Typography>
                        <Link href="/legal" color="inherit">Mentions légales</Link>
                        <Link href="/contact" color="inherit">Contact</Link>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Container>
    )
};
export default Footer;