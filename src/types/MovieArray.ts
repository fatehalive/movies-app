import { Draft } from "@reduxjs/toolkit"
import { MovieInterface } from "./MovieInterface"

export interface MovieArray extends Array<Draft<MovieInterface>> {}