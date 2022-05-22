import { movies_series } from "../../data/data";

export default function handler(req, res) {
  const movies = movies_series.filter((movie) => {
    return movie.category.toLowerCase().includes("tv series");
  });
  res.status(200).json(movies);
}
