import { Request, Response } from "express";
import { supabase } from "../supabase/client";

// Extend express-session types to include 'user' property
declare module "express-session" {
  interface SessionData {
    user?: any;
  }
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json({
    message: "Signup successful. Check your email for verification."
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(401).json({ error: error.message });
    return;
  }

  req.session.user = data.user;
  res.json({ message: "Login successful", user: data });
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Logout failed" });
      return;
    }

    res.json({ message: "Logged out successfully" });
  });
};
