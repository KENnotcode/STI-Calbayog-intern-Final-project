// hooks/useRouteChange.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const useRouteChange = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Check if the route is not within the admin section
      if (!url.startsWith("/admin")) {
        localStorage.removeItem("loggedInUser");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
};

export default useRouteChange;
