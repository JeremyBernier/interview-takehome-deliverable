import type { NextApiRequest, NextApiResponse } from 'next';
import type { Movie } from '@/types/movie';

import movieJsonUnformatted from '@/json/movies.json';
import { Filters } from '@/types/filters';

// Make sure all genres are lowercase for consistency
const movieJson = movieJsonUnformatted.map((movie) => {
  return {
    ...movie,
    genres: movie.genres.map((genre) => genre.toLowerCase()),
  };
});

export function filterMovie(movie: Movie, filters: Filters) {
  return (
    (!filters.startYear || movie.year >= filters.startYear) &&
    (!filters.endYear || movie.year <= filters.endYear) &&
    (!filters.genres?.length || filters.genres.every((genre) => (movie.genres ?? []).includes(genre)))
  );
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filters = req.query.filters ? JSON.parse(req.query.filters as string) : null;

  return res
    .status(200)
    .send({ data: filters == null ? movieJson : movieJson.filter((movie) => filterMovie(movie, filters)) });
}
