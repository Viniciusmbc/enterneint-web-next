import { supabase } from "../../utils/supabaseClient";
import { useAuth } from "../../context/AuthContext";

const bookmarkedAPI = async (req, res) => {
  if (req.method === "GET") {
    const { data: bookmarked, error } = await supabase
      .from("userfavoriteshows")
      .select("*")
      .eq("user_id", session.user.id);
    if (error) {
      res.status(500).json({ error });
    }
    return res.status(200).json(bookmarked);
  }
};

export default bookmarkedAPI;
