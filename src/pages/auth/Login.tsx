import React from "react";
import { Paper, Container, Box } from "@mui/material";

export const Login: React.FC = () => {
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md">
        <h2>Login</h2>
        <Box>Modal</Box>
      </Container>
    </Paper>
  );
};
