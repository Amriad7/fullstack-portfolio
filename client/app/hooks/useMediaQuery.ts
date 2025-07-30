import { useEffect, useLayoutEffect, useState } from "react";

const IS_SERVER = typeof window === "undefined";

const useIsomorphicLayoutEffect = typeof IS_SERVER
  ? useEffect
  : useLayoutEffect;

export const useMediaQuery = (query: string, defaultValue: boolean = false) => {
  const [matches, setMatches] = useState<boolean>(defaultValue);

  useIsomorphicLayoutEffect(() => {
    const MatchQuery = window.matchMedia(query);
    setMatches(MatchQuery.matches);

    MatchQuery.addEventListener("change", handleChange);
    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    return () => {
      MatchQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};
