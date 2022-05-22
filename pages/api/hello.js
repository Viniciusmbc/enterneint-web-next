// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { movies_series } from "../../data/data";

export default function handler(req, res) {
  res.status(200).json(movies_series);
}
