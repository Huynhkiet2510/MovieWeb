import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { token, profileStatus } = useSelector(state => state.auth);

  if (profileStatus === "loading") {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }



  return children;
};

export default RequireAuth;
