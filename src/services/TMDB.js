import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}&language=en-US`,
    }),

    //* get movies by type
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* get movies by search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}&language=en-US`;
        }

        // Get movies by category name
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}&language=en-US`;
        }

        // Get movies by Genre id
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}&language=en-US`;
        }

        // Get movies by Popularly
        return `movie/popular?api_key=${tmdbApiKey}&page=${page}`;
      },
    }),

    //* Get movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=vidoes,credits&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery } =
  tmdbApi;
