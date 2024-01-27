import React from "react";
import { Paper, Container, Box } from "@mui/material";

export const Movie: React.FC = () => {
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md">
        <h2>Movie</h2>
        <Box>Carousel</Box>
      </Container>
    </Paper>
  );
};
