import type { Movie } from '@/types/movie';
import React from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { capitalize } from '@/utils/string';

const columnHelper = createColumnHelper<Movie>();

const columns = [
  columnHelper.accessor('title', {
    cell: ({ row, getValue }) => (
      <Link className="hover:text-blue-600 transition" href={`/movies/${row.original.slug}`}>
        {getValue<string>()}
      </Link>
    ),
    footer: (info) => info.column.id,
    header: 'Title',
  }),
  columnHelper.accessor((row) => row.year, {
    id: 'year',
    cell: (info) => <i>{info.getValue()}</i>,
    header: 'Year',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('genres', {
    header: 'Genres',
    footer: (info) => info.column.id,
    cell: ({ row, getValue }) => <span>{getValue().map(capitalize).join(', ')}</span>,
  }),
];

const MovieListTable = ({ data }: { data: any }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-3/5">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieListTable;
