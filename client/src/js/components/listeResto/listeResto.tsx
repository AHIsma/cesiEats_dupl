import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';

// Ceci devra être automatisé dans le futur
// pour permettre d'afficher un nombre précis de restaurants
export default function ListeResto() {
  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="../Logo.png"
            alt="restaurant"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Chez Mamita, restaurant oriental
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Un restaurant atypique du coin, avec des très bonnes spécialités du Maghreb.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}