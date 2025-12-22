import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireGuest = ({ children }) => {
  const { token, profileStatus } = useSelector(state => state.auth);

  if (profileStatus === "loading") {
    return null;
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireGuest;
