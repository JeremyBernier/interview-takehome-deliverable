import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const MoviePage = () => {
  const slug = useRouter().query.slug as string;

  const { data } = useQuery({
    queryKey: ['movies', slug],
    queryFn: () => fetch(`/api/movies/${slug}`).then((res) => res.json()),
    enabled: slug != null,
  });

  const movie = data?.data;

  // TODO: Add meta tags

  return (
    <main className="max-w-4xl mx-auto mt-24">
      <article>
        <h1 className="text-lg font-semibold text-center mb-16 uppercase">Movie Details</h1>
        {movie && (
          <div className="flex gap-16 mx-auto max-w-2xl">
            <div>
              <Image
                src={movie.thumbnail}
                alt={movie.title}
                width={movie.thumbnail_width}
                height={movie.thumbnail_height}
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">{movie.title}</h2>
              <h2>{movie.year}</h2>
              <h2>{movie.genres.join(', ')}</h2>
            </div>
          </div>
        )}
      </article>
    </main>
  );
};

export default MoviePage;
