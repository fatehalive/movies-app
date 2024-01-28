import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { ProfileTabPanel, MovieCard } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveFromDB } from "@/store/slices/user";

function otherProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const Profile: React.FC = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(state.tab);
  const { watched, watchList } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClick = (event: React.SyntheticEvent) => {
    dispatch(retrieveFromDB({ dbName: "watched", storeName: "test" }));
  };
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md" sx={{ height: "calc(100vh - 68px)" }}>
        <h2>Profile</h2>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="profile-tabs">
            <Tab label="Profile" {...otherProps(0)} />
            <Tab label="Watch List" {...otherProps(1)} />
            <Tab label="Watched" {...otherProps(2)} />
          </Tabs>
          <ProfileTabPanel value={value} index={0}>
            <Typography>First Name:</Typography>
            <Typography>Last Name:</Typography>
          </ProfileTabPanel>
          <ProfileTabPanel value={value} index={1}>
            <Grid container spacing={2}>
              {watchList.length ? (
                watchList.map((movie: any) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <Typography variant="subtitle1">You have no watchlist</Typography>
              )}
            </Grid>
          </ProfileTabPanel>
          <ProfileTabPanel value={value} index={2}>
            <Grid container spacing={2}>
              {watched.length ? (
                watched.map((movie: any) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <Typography variant="subtitle1">You haven't watched anything yet</Typography>
              )}
            </Grid>
            <button onClick={handleClick}>try get from db</button>
          </ProfileTabPanel>
        </Box>
      </Container>
    </Paper>
  );
};
