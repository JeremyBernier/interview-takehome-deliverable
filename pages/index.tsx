import { Inter } from 'next/font/google';
import { useState } from 'react';

import { Filters } from '@/types/filters';
import { AIFilter } from '@/components/AIFilter';
import { useQuery } from '@tanstack/react-query';
import MovieListTable from '@/components/MovieListTable';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

function parseFiltersFromUrl(query: any): Filters {
  return {
    ...query,
    genres: query.genres ? query.genres.split(',') : undefined,
  };
}

export default function MovieListPage() {
  const router = useRouter();
  const filters = Object.keys(router.query).length === 0 ? null : parseFiltersFromUrl(router.query);
  const { data } = useQuery({
    queryKey: ['movies', filters],
    queryFn: () =>
      fetch(
        '/api/movies' +
          (filters != null
            ? `?` +
              new URLSearchParams({
                filters: JSON.stringify(filters),
              })
            : ''),
      ).then((res) => res.json()),
  });

  const onFilterChange = (filters: Filters) => {
    router.push(`/?${new URLSearchParams(filters as any).toString()}`);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-24 py-12 ${inter.className}`}>
      <Link href="/">
        <h1 className="text-4xl font-bold text-center pb-12">Movies</h1>
      </Link>
      <AIFilter onFilterChange={onFilterChange} />
      {data?.data && <MovieListTable data={data.data} />}
    </main>
  );
}

// TODO: server-side rendering
// export const getServerSideProps = async (context) => {
// };
