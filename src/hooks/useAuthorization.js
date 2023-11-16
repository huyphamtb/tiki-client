import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "../store/common";

const useAuthorization = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.common);

  const redirect = (path = "/") => {
    dispatch(commonActions.toggleLoginForm(true));
    console.log(path);
  };

  const checkRole = (role = 2) => {
    const token = localStorage.getItem("access_token");
    return !!token && !!userInfo._id;
  };

  return {
    redirect,
    checkRole,
  };
};

export default useAuthorization;
