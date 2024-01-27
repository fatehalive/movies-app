import { FC } from "react";
import { useLocation } from "react-router";
import { Paper, Container, Grid, InputBase } from "@mui/material";
import { useSearchMultiQuery } from "@/api";
import { MovieCard } from "@/components";

export const Search: FC = (props) => {
  const location = useLocation();
  const { data, isLoading } = useSearchMultiQuery({
    ...location.state,
  });

  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md">
        <Paper elevation={2}>
          <InputBase defaultValue={location.state.query || null} />
        </Paper>
        <h2>Search Result: {location.state?.query}</h2>
        <Grid container spacing={2}>
          {isLoading
            ? "Loading..."
            : data.results.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </Grid>
      </Container>
    </Paper>
  );
};
