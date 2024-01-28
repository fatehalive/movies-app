import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Box, Paper, Container, Grid, InputBase } from "@mui/material";
import { MovieCard } from "@/components";
import { useAppSelector } from "@/hooks";

export const Search: FC = (props) => {
  const { results } = useAppSelector((state: any) => state.search);
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Paper elevation={5}>
        <Box minHeight={40}>
          <Container maxWidth="md">
            <InputBase defaultValue={params.get("query") || undefined} />
          </Container>
        </Box>
      </Paper>
      <Container maxWidth="md">
        <h2>Search Result: </h2>
        <Grid container spacing={2}>
          {results.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Grid>
      </Container>
    </Paper>
  );
};
