// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { movies_series } from "../../data/data";

export default function handler(req, res) {
  const httMethod = req.method;

  const movies = movies_series.filter(({ isBookmarked }) => {
    if (isBookmarked) {
      return movies_series;
    }
  });

  res.statusCode = 200;
  res.json(movies);
}
