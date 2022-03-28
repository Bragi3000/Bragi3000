import { useSelector } from "react-redux";

const useUserData = function () {
  return useSelector((state) => state.firebase.auth);
};

export default useUserData;
