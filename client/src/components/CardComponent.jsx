import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({ image, heading, header, content }) {
  return (
    <Card sx={{ maxWidth: 345, border: 'none', width: { md: '25vw', xs: '90vw'}, paddingBottom: '0' }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt="green iguana"
        style={{ border: 'none' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {heading}
        </Typography>
        <Typography variant="h6" component="div">
          {header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}