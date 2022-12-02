import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Orders = ({ products, cancelOrder }) => {
  return (
    <>
      {products.length ? (
        <Box sx={{ padding: "3rem" }}>
          <h1>Your Orders</h1>
          <h3 style={{ textAlign: "left" }}>Thank You for shopping with us!</h3>

          {/* <Box className="order" sx={{ display: "flex", justifyContent: "space-between", marginBottom: "3vh" }}>
        <h3>Image</h3>
        <h3>Composition</h3>
        <h3>Price</h3>
        <h3>Order Date</h3>
        <h3></h3>
      </Box> */}
          {products.map((product) => (
            <Box className="order" key={product.id} sx={{ display: "flex", justifyContent: "space-between", marginBottom: "3vh" }}>
              <img src={product.image} alt={product.title} style={{ width: "10%" }} />
              <h4>{product.composition}</h4>
              <h4>₹{product.price}</h4>
              <h4>{product.date}</h4>
              <Button onClick={() => cancelOrder(product.id)}>Cancel Order</Button>
            </Box>
          ))}
        </Box>
      ) : (
        <h1>No Orders Yet!</h1>
      )}
    </>
  );
};

export default Orders;
