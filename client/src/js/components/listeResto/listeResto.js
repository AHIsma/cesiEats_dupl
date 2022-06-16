import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ListeResto = () => {
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="../Logo.png"
          alt="Magnifique resto"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Chez Mamita, restaurant oriental
          </Typography>
          <Typography variant="body2" color="text.secondary">
            wesh les beaux gosses ça dit quoi ?
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
};
export default ListeResto;