/**
 * Interface des données d'un film.
 */
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

/**
 * Méthode retournant un tableau de films.
 */
export async function getMovies(): Promise<Movie[]> {
  try {
    const res: Movie[] = [];

    const f1 = require("../data/PopularMovies_p1.json");
    const f2 = require("../data/PopularMovies_p2.json");

    const response = [...f1.results, ...f2.results];

    response.forEach((value: any) => {
      res.push({
        id: value.id,
        title: value.title,
        release_date: value.release_date,
        vote_average: value.vote_average,
        overview: value.overview,
        poster_path: value.poster_path,
      });
    });
    return res;
  } catch (error: any) {
    throw error;
  }
}
