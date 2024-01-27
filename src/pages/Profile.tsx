import React from "react";
import { Paper, Container, Box } from "@mui/material";

export const Profile: React.FC = () => {
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md">
        <h2>Profile</h2>
        <Box>Tab of submenu: (profile, watch list, watched)</Box>
      </Container>
    </Paper>
  );
};
