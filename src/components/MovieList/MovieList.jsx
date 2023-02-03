import React from 'react';
import { Grid } from '@mui/material';

import { Movie } from '..';
import useStyle from './styles';

const MovieList = ({ movies }) => {
  const classes = useStyle();

  return (
    <Grid container={classes.moviesContainer}>
      {movies.results.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
};

export default MovieList;
