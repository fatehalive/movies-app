import { MouseEvent } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, BookmarkAdd, Visibility } from "@mui/icons-material";

const GENRE = {
  12: "Adventure",
  14: "Fantasy",
  16: "Animation",
  18: "Drama",
  28: "Action",
  35: "Comedy",
  36: "History",
  37: "Western",
  53: "Thriller",
  80: "Crime",
  99: "Documentary",
  878: "Science Fiction",
  9648: "Mystery",
  10402: "Music",
  10749: "Romance",
  10751: "Family",
  10752: "War",
  10770: "War",
};

export const MovieCard = ({ movie, key }: { key: number; movie: any }) => {
  const {
    title,
    first_air_date,
    poster_path,
    vote_average,
    media_type,
    genre_ids,
    overview,
  } = movie;
  const navigate = useNavigate();

  const handleClickCard = (event: MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    const name = event.currentTarget.getAttribute("data-name");
    name?.toLowerCase().split(" ").join("-");
    switch (media_type) {
      case "tv":
        navigate(`/tv/${id}`);
        break;
      case "person":
        navigate(`/person/${id}`);
        break;
      case "movie":
        navigate(`/movie/${id}`);
        break;
    }
  };

  return (
    <Grid item md={4}>
      <Card
        key={key}
        data-id={movie.id}
        data-name={movie.name}
        onClick={handleClickCard}
        sx={{ borderRadius: 7 }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title || movie.name}
          />

          <CardContent sx={{ maxHeight: { md: 170 }, overflow: "hidden" }}>
            <Typography variant="h5" component="h2" gutterBottom>
              {title || movie.name}
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Release Date: {first_air_date}
            </Typography>

            {/* <Typography variant="body1" color="textSecondary">
              Genres:
              {genre_ids.map((genreId: number) => (
                <span key={genreId}>
                  {GENRE[genreId as keyof typeof GENRE] || ""}
                </span>
              ))}
            </Typography> */}

            <Typography variant="body2" color="textSecondary">
              Average Rating: {vote_average}
            </Typography>

            <Typography variant="body1" color="textPrimary">
              {overview}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Box display={"flex"} width={"100%"}>
            <Box
              flexBasis={"33.33%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <IconButton>
                <Favorite />
              </IconButton>
            </Box>
            <Box
              flexBasis={"33.33%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <IconButton>
                <Visibility />
              </IconButton>
            </Box>
            <Box
              flexBasis={"33.33%"}
              display={"flex"}
              justifyContent={"center"}
            >
              <IconButton>
                <BookmarkAdd />
              </IconButton>
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};
