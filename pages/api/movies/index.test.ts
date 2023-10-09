import { Movie } from '@/types/movie';
import { filterMovie } from './index';

describe('filterMovie', () => {
  const movie: Movie = {
    slug: 'Throw_Momma_from_the_Train',
    description:
      'Throw Momma from the Train is a 1987 American crime comedy film starring and directed by Danny DeVito in his theatrical directorial debut. The film co-stars Billy Crystal, Anne Ramsey, Rob Reiner, Branford Marsalis, Kim Greist, and Kate Mulgrew.',
    title: 'Throw Momma from the Train',
    year: 1987,
    genres: ['Comedy', 'Crime'],
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/8/89/Throwmommafromthetrain.jpg',
    thumbnail_width: 250,
    thumbnail_height: 372,
  };

  it('should return true if no filters are provided', () => {
    const filters = {};
    const result = filterMovie(movie, filters);
    expect(result).toBe(true);
  });

  it('should return true if the movie year is within the filter range', () => {
    const filters = { startYear: 1985, endYear: 1990 };
    const result = filterMovie(movie, filters);
    expect(result).toBe(true);
  });

  it('should return false if the movie year is outside the filter range', () => {
    const filters = { startYear: 2000, endYear: 2010 };
    const result = filterMovie(movie, filters);
    expect(result).toBe(false);
  });

  it('should return true if the movie genre is included in the filter genres', () => {
    const filters = { genres: ['Comedy', 'Crime'] };
    const result = filterMovie(movie, filters);
    expect(result).toBe(true);
  });

  it(`should return false if movie genre doesn't match all filters`, () => {
    const filters = { genres: ['Comedy', 'Action'] };
    const result = filterMovie(movie, filters);
    expect(result).toBe(false);
  });
});
