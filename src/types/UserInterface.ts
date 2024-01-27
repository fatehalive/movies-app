import { MovieInterface } from "./MovieInterface";

export interface UserInterface {
    userId: string | number;
    username: string;
    firstName?: string | null;
    lastName?: string | null;
    watchList: Array<MovieInterface | undefined>;
    watched: Array<MovieInterface | undefined>;
  }
  