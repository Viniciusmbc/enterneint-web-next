// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { movies_series } from "../../data/data";

export default function handler(req, res) {
  const movies = movies_series.filter((movie) => {
    return movie.category.toLowerCase().includes("movie");
  });
  const { method } = req;
  switch (method) {
    case "GET":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(movies));
      break;
    case "UPDATE":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(movies));
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Not found" }));
  }
}
