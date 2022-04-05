import { useMemo } from "react";
import { useLocation } from "react-router";

/**
 * Custom hook to use search parameters that are stored in the location hash
 * @returns The parameters
 */
const useHashParams = function () {
  const location = useLocation();

  return useMemo(() => {
    const paramString = location.hash.substring(1);
    return new URLSearchParams(paramString);
  }, [location.hash]);
};

export default useHashParams;
