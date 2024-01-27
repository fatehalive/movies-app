import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export type SearchBaseParam = {
  query: string;
  page?: number;
};

export type SearchAdultParam = SearchBaseParam & {
  include_adult?: boolean;
  language?: string;
};

export type SearchYearParam = SearchAdultParam & {
  year?: number;
  firs_air_date_year?: number;
};

export type SearchRegionParam = SearchAdultParam & {
  region?: string;
  year?: number;
  primary_release_year?: string;
};

const searchEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  searchCollection: builder.query<any, SearchBaseParam>({
    query: (params) => `/search/collection${params.query}`,
  }),
  searchCompany: builder.query<any, SearchBaseParam>({
    query: (params) => `/search/company${params.query}`,
  }),
  searchKeyword: builder.query<any, SearchAdultParam>({
    query: ({ query, page = 1 }) => ({
      url: "/search/keyword",
      params: {
        query,
        page,
      },
    }),
  }),
  searchMulti: builder.query<any, SearchAdultParam>({
    query: (params) => ({
      url: "/search/multi",
      params: { ...params },
    }),
  }),
  searchMovie: builder.query({
    query: (params: SearchBaseParam) => ({
      url: `/search/movie`,
      params,
    }),
  }),
  searchPerson: builder.query({
    query: (params: SearchAdultParam) => ({
      url: "/search/person",
      params: { ...params },
    }),
  }),
  searchTv: builder.query({
    query: (params: SearchYearParam) => ({
      url: "/search/tv",
      params: { ...params },
    }),
  }),
});

export default searchEndpoints;
