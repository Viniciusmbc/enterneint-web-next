import { createContext, useContext, useEffect, useState } from "react";

// Supabase
import { supabase } from "../utils/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();
    setSession(session);

    // Listen for changes on auth state (logged in, signed out, etc.)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (session) => {
        setSession(session);
      }
    );
    setIsLoading(false);
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Add functions to context value
  const signUp = (data) => supabase.auth.signUp(data);
  const signIn = (data) => supabase.auth.signIn(data);
  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, session, isLoading }}>
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
