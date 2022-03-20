import { useEffect } from "react";

/**
 * Hook to set the title of the page
 *
 * @param {String} title Title of the page
 */
const useTitle = function (title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useTitle;
