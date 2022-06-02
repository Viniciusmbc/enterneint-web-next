import { createContext, useContext, useEffect, useState } from "react";

// Supabase
import { supabase } from "../utils/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);

  console.log(token);
  console.log(user);

  useEffect(() => {
    // Check active sessions and sets the user
    const activeSession = supabase.auth.session();
    if (activeSession?.user.id) {
      setUser(activeSession.user);
      setToken(activeSession.access_token);
    }
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)

    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.id) {
        setUser(session.user);
        setToken(session.access_token);
      }
      setLoading(false);
    });
  }, []);

  // Add functions to context value
  const signUp = (data) => supabase.auth.signUp(data);
  const signIn = (data) => supabase.auth.signIn(data);
  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
