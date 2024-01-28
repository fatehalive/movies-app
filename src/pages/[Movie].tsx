import { FC, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Container,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { BookmarkAdd, Visibility } from "@mui/icons-material";
import { useAppDispatch } from "@/hooks";
import { markAsWatched, addWatchList, saveToDB } from "@/store/slices/user";
import { MovieInterface } from "@/types";
import { useMovieDetailQuery } from "@/api";

export const Movie: FC = () => {
  const { state } = useLocation();
  const { data, isLoading } = useMovieDetailQuery({ movie_id: state.id });
  const dispatch = useAppDispatch();

  const handleClickAddWatchList = useCallback(() => {
    const args: MovieInterface = {
      id: data.id,
      adult: data.adult,
      backdrop_path: data.backdrop_path,
      genre_ids: [],
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      poster_path: data.poster_path,
      release_date: data.release_date,
      title: data.title,
      video: data.video,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
    };
    dispatch(
      saveToDB({ movie: args, dbName: "watch_list", storeName: "test" })
    );
    dispatch(addWatchList(args));
  }, [dispatch, data]);

  const handleClickMarkWatched = useCallback(() => {
    const args: MovieInterface = {
      id: data.id,
      adult: data.adult,
      backdrop_path: data.backdrop_path,
      genre_ids: [],
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      poster_path: data.poster_path,
      release_date: data.release_date,
      title: data.title,
      video: data.video,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
    };
    dispatch(saveToDB({ movie: args, dbName: "watched", storeName: "test" }));
    dispatch(markAsWatched(args));
  }, [dispatch, data]);

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
            <CardContent sx={{ flex: 1, clear: "both" }}>
              <Typography variant="h4" component="div">
                {data.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {data.tagline}
              </Typography>
              <Typography variant="body1">
                {data.release_date?.replace(/-/g, "/")} &bull; {data.runtime}{" "}
                minutes
              </Typography>
              <Box display={"flex"}>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    value={data.vote_average * 10}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >{`${Math.round(data.vote_average * 10)}%`}</Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 2, px: 3 }}>
                  <IconButton onClick={handleClickMarkWatched}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={handleClickAddWatchList}>
                    <BookmarkAdd />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Overview
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
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
