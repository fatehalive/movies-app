import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { TMReqMovieDetail } from '@/types'

const movieEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  movieDetail: builder.query<any, TMReqMovieDetail>({
    query: (arg) => ({
        url: `/movie/${arg.movie_id}`
    })
  }),
});

export default movieEndpoints;
