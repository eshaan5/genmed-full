import React from "react";
import { Typography, List, ListItem, ListItemText, Paper, Button, MenuItem, Select } from "@mui/material";

const Review = ({ medicine, handlePlaceOrder, displayRazorpay }) => {
  const [cod, setCod] = React.useState(false);

  const handleChange = (event) => {
    setCod(event.target.value);
  };

  return (
    <Paper elevation={8} sx={{ marginTop: "15vh", padding: "3rem", marginRight: "10vw", marginLeft: "10vw" }}>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary={medicine.composition} secondary={`Price: ₹${(medicine.price * 3) / 5}`} />
          <Typography variant="body2">{medicine.name}</Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography style={{ fontWeight: 700 }} variant="subtitle1">
            {`₹${(medicine.price * 3) / 5}`}
          </Typography>
        </ListItem>
      </List>
      <Select labelId="modeofpayment" id="mode-of-payment" label="Mode of Payment" onChange={handleChange} value={cod}>
        <MenuItem value={true}>Cash on Delivery</MenuItem>
        <MenuItem value={false}>Online Payment</MenuItem>
      </Select>
      <Button variant="contained" color="success" onClick={() => {
        cod ? handlePlaceOrder() : displayRazorpay();
      }}>
        Place Order
      </Button>
    </Paper>
  );
};

export default Review;
