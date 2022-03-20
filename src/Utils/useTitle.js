import { useEffect } from "react";

/**
 * Hook to set the title of the page
 *
 * @param {String} title Title of the page
 */
const useTitle = function (title) {
  useEffect(() => {
    const originalTitle = document.title;

    document.title = title;

    return () => {
      document.title = originalTitle;
    }
  }, [title]);
};

export default useTitle;
