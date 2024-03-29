import React, { useId, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  InputBase,
  Typography,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppDispatch, useOnlineStatus } from "@/hooks";
import api from "@/api";
import { setSearch } from "@/store/slices/search";

export const Home: React.FC = () => {
  const id = useId();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const online = useOnlineStatus();

  const handleOnSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const searchTerm = event.currentTarget.elements["query"].value;
    const form = event.currentTarget;
    const searchEl = form.elements.namedItem("query") as HTMLInputElement;
    const querySearch = searchEl.value

    querySearch.replace(/^\s+|\s+$/gm,'') // trimming

    const params = { query: querySearch, page: 1 };
    
    dispatch(api.endpoints.searchMulti.initiate(params)).then((result) => {
      const { isSuccess, data } = result;
      dispatch(setSearch(data))
      if (isSuccess) navigate(`/search?query=${querySearch.replace(/\s/g, '+')}`);
    });
  };

  return (
    <>
      <Paper component={"section"} elevation={0}>
        <Container
          maxWidth="md"
          className="border border-black"
          sx={{
            textAlign: "center",
            height: "calc(100vh - 68px)",
          }}
        >
          <Typography
            variant="h3"
            className="border border-black"
            sx={{ fontSize: { sx: "0.5rem", md: "11rem" }, fontWeight: 800 }}
          >
            Welcome
          </Typography>
          <Typography variant="h4" className="border border-black">
            Millions of movies, TV shows and people to discover. Explore now.
          </Typography>
          <Box
            id={`${id}-search`}
            name="search-movie"
            component={"form"}
            onSubmit={handleOnSubmitForm}
          >
            <InputBase
              name="query"
              placeholder="Search for a movie, tv show, person..."
              inputProps={{ "aria-label": "search movie" }}
              fullWidth
              sx={{ border: "1px solid black" }}
              endAdornment={
                <IconButton type="submit">
                  <Search />
                </IconButton>
              }
            />
          </Box>
          <div>{online ? "online" : "offline"}</div>
        </Container>
      </Paper>
    </>
  );
};
