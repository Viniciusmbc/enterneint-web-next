// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { movies_series } from "../../data/data";

export default function handler(req, res) {
  const movies = movies_series.filter((movie) => {
    return movie.category.toLowerCase().includes("movie");
  });
  res.status(200).json(movies);
}
