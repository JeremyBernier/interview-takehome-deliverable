import { Filters } from '@/types/filters';
import { useState } from 'react';

export const AIFilter = ({ onFilterChange }: { onFilterChange: (filters: Filters) => void }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="w-3/5 mb-12">
      <h2 className="font-semibold">Filter with AI</h2>
      <form
        className="flex"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!query) {
            return;
          }
          const res = await fetch(`/api/ai?q=${query}`);
          const json = await res.json();
          if (json?.data?.filters) {
            onFilterChange(json.data.filters);
          }
        }}
      >
        <input
          type="text"
          className="w-full border px-3 py-2"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="border px-3 py-1 bg-gray-200 hover:bg-gray-300 transition">
          Go!
        </button>
      </form>
    </div>
  );
};
