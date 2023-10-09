import type { NextApiRequest, NextApiResponse } from 'next';

import movieJsonUnformatted from '@/json/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const movie = movieJsonUnformatted.find((movie) => movie.slug === req.query.slug);
  if (movie) {
    return res.status(200).send({ data: movie });
  }
  return res.status(404).send('Movie not found');
}
