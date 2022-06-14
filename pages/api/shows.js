import { supabase } from "../../utils/supabaseClient";

const showsAPI = async (req, res) => {
  if (req.method === "GET") {
    const { data: getData, error } = await supabase.from("Shows").select("*");
    if (error) {
      res.status(500).json({ error });
    }
    return res.status(200).json(getData);
  }
};

export default showsAPI;
