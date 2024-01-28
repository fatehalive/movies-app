import { MouseEvent, SyntheticEvent, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { BookmarkAdd, Visibility, Delete } from "@mui/icons-material";
import { useAppDispatch } from "@/hooks";
import { addWatchList, markAsWatched, removeAsWatched, saveToDB } from "@/store/slices/user";
// import { GENRE } from "@/libs/helpers/constants";

export const MovieCard = ({ movie }: { movie: any, for?: string }) => {
  const {
    title,
    first_air_date,
    release_date,
    poster_path,
    vote_average,
    media_type,
    // genre_ids,
    overview,
  } = movie;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleClickMarkWatched = useCallback((e: SyntheticEvent) => {
    dispatch(markAsWatched(movie));
    dispatch(saveToDB({ dbName: "watched", storeName: "test", movie }));
  }, [dispatch, movie]);

  const handleClickAddWatchList = useCallback((e: SyntheticEvent) => {
    dispatch(addWatchList(movie));
    dispatch(saveToDB({ dbName: "watch_list", storeName: "test", movie }));
  }, [dispatch, movie]);

  const handleClickCard = (event: MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    // const name = event.currentTarget.getAttribute("data-name");
    // name?.toLowerCase().split(" ").join("-");
    navigate(`/${media_type}/${id}`, { state: { id: id } });
  };

  const handleClickDelete = useCallback((arg: SyntheticEvent) => {
    dispatch(removeAsWatched(movie.id))
  }, [dispatch, movie])

  return (
    <Grid item md={4}>
      <Card
        key={movie.id}
        data-id={movie.id}
        data-name={movie.name}
        sx={{ borderRadius: 7 }}
      >
        <CardActionArea data-id={movie.id} onClick={handleClickCard}>
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
              Release Date: {release_date || first_air_date}
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
          {pathname.includes("profile") ? (
            <Box display={"flex"} width={"100%"} justifyContent={"center"}>
              <IconButton data-id={"Delete"} onClick={handleClickDelete}>
                <Delete />
              </IconButton>
            </Box>
          ) : (
            <Box display={"flex"} width={"100%"}>
              <Box flexBasis={"50%"} display={"flex"} justifyContent={"center"}>
                <IconButton onClick={handleClickMarkWatched}>
                  <Visibility />
                </IconButton>
              </Box>
              <Box flexBasis={"50%"} display={"flex"} justifyContent={"center"}>
                <IconButton onClick={handleClickAddWatchList}>
                  <BookmarkAdd />
                </IconButton>
              </Box>
            </Box>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};
