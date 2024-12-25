import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "../../common/constants";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userDetails = sessionStorage.getItem("userDetails");
  const location = useLocation();

  if (!userDetails) {
    return <Navigate to={LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
