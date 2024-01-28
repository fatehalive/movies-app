import { FC } from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Paper,
  Container,
} from "@mui/material";
import { useMovieDetailQuery } from "@/api";
import { TMResMovieDetail } from "@/types";

export const TvShow: FC = () => {
  const { state } = useLocation();
  const { data, isLoading } = useMovieDetailQuery({ movie_id: state.id });
  return (
    <Paper component={"section"} sx={{ border: "1px solid black" }}>
      <Container maxWidth="md">
        {isLoading ? (
          <div>"Loading..."</div>
        ) : (
          <Card sx={{ display: "flex", my: 4 }}>
            <CardMedia
              component="img"
              sx={{ width: 250 }}
              image={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
            />
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5" component="div">
                {data.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {data.tagline}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <div>Genre</div>
                {/* {data.genres.map((genre: { id: number; name: string }) => (
                  <Grid item key={genre.id}>
                    <Chip label={genre.name} />
                  </Grid>
                ))} */}
              </Grid>
              <Typography variant="body1">
                Release Date: {data.release_date} &bull; Runtime: {data.runtime}{" "}
                minutes
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {data.overview}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Box Office: ${data.revenue}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Paper>
  );
};
