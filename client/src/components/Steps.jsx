import { Box } from "@mui/system";
import React from "react";
import MediaCard from "./CardComponent";

const Steps = () => {
  return (
    <Box>
      <h1 style={{ color: "rgba(0, 0, 0, 0.87)" }}>Steps to place an Order with GenMeds</h1>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5vh", padding: { md: '30px', xs: '0' }, flexDirection: { xs: "column", md: "row" }, gap: '4vw' }}>
      <MediaCard
        image='https://www.truemeds.in/static/media/search_illustration.c6706065.svg'
        heading="Step 1"
        header="Search for your medicine"
        content="Search for your medicines & Add them to your cart"
      />
      <MediaCard
        image='https://www.truemeds.in/static/media/consultation.92fe8567.svg'
        heading="Step 2"
        header="Compare with our alternative"
        content="The alternative provided by us will be better both in terms of price and quality"
      />
      <MediaCard
        image='https://www.truemeds.in/static/media/medicine.4caad9a4.svg'
        heading="Step 3"
        header="Opt for quality alternatives"
        content="Replace your branded medicines with doctor-recommended alternatives and save up to 51%."
      />
      </Box>
    </Box>
  );
};

export default Steps;
