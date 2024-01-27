import React from "react";
import { Paper, Container, Box } from "@mui/material";

export const Peoples: React.FC = () => {
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md">
        <h2>Peoples</h2>
        <Box>Card List of People</Box>
      </Container>
    </Paper>
  );
};
