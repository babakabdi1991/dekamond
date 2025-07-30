import { APP_PATH, STATIC_CACHE_NAMES } from "@/app/_common/constants";
import { User } from "@/app/_common/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useCheckLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = () => {
    try {
      const userData = localStorage.getItem(STATIC_CACHE_NAMES.USER);

      if (!userData) {
        router.push(APP_PATH.LOGIN);
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser.results[0]);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push(APP_PATH.LOGIN);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return { isLoading, user };
}
