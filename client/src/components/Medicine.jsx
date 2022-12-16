import { Box } from "@mui/system";
import { Button } from "@mui/material";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Medicine = ({ medicine, handleBuyNow }) => {
  // check for status first
  return (
    <>
      {medicine.status ? (
        <Box sx={{ marginTop: "5vh", border: "1px solid black", borderRadius: "10px", width: "90vw", marginLeft: "5vw", color: "rgba(0, 0, 0, 0.87)" }}>
          <h2 style={{ padding: 0, margin: 0 }}>Composition: {medicine.composition}</h2>
          <h2 style={{ padding: 0, margin: 0, marginBottom: "2vh" }}>Name: {medicine.name}</h2>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <img src={medicine.image} alt="medicine" style={{ width: "20vw" }} />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "45vw" }}>
              <a href={medicine.url} target="_blank" rel="noreferrer" style={{ color: "inherit", display: "flex", textDecoration: "none" }}>
                <h3>{`Price (on Netmeds): ₹${medicine.price}`}</h3>
                <ArrowOutwardIcon sx={{ marginTop: "3vh" }} />
              </a>
              <h2 style={{ color: "#f22c05", marginBottom: "1vh" }}>{`Our Price: ₹${(medicine.price * 3) / 5}`}</h2>
              <h4>{medicine.packing}</h4>
              <Button variant="contained" color="success" sx={{ marginBottom: "2vh" }} onClick={handleBuyNow}>
                Buy Now
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <h2>Error in fetching your medicine. Try Again</h2>
      )}
    </>
  );
};

export default Medicine;
