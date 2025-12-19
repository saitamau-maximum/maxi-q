// hooks/useProfile.ts
import { useState, useEffect } from "react";
import { serverFetch } from "~/utils/fetch"; // さっきのファイルをインポート

type User = {
	id: string;
	displayId: string;
	name: string;
	createdAt: string;
};

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await serverFetch("/auth/me");

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUser(data);
      return data; 
    } catch (e) {
      setError(e instanceof Error ? e : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { user, setUser, isLoading, error, refetch: fetchProfile };
};