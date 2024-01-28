import { Route, Routes } from "react-router";
import {
  About,
  Home,
  TvShows,
  TvShow,
  Movies,
  Movie,
  Peoples,
  People,
  Profile,
  Search,
} from "@/pages";
import { Header } from "@/components";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/profile" Component={Profile}></Route>
        <Route path="/movie/:id" Component={Movie}></Route>
        <Route path="/movie" Component={Movies}></Route>
        <Route path="/tv/:id" Component={TvShow}></Route>
        <Route path="/tv" Component={TvShows}></Route>
        <Route path="/person/:id" Component={People}></Route>
        <Route path="/person" Component={Peoples}></Route>
        <Route path="/about" Component={About}></Route>
      </Routes>
    </>
  );
}

export default App;
