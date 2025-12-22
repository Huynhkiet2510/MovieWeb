import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { session_id } = useSelector(state => state.auth);

  if (!session_id) {
    return <Navigate to="/login" replace />;
  }



  return children;
};

export default RequireAuth;
