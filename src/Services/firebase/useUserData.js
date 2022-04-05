import { useSelector } from "react-redux";

/**
 * Custom hook to retrieve Firebase user data
 */
const useUserData = function () {
  return useSelector((state) => state.firebase.auth);
};

export default useUserData;
