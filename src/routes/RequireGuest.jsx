import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireGuest = ({ children }) => {
  const { session_id } = useSelector(state => state.auth);

  if (session_id) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireGuest;
