export interface GenreChip {
  id: number;
  name: string;
}

export interface TMResMovieDetail {
  poster_path: string;
  title: string;
  tagline: string;
  genres: GenreChip[];
  release_date: string;
  runtime: number;
  overview: string;
  revenue: number;
}
