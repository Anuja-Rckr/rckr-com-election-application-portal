import { Navigate, useLocation } from "react-router-dom";
import { LOGIN } from "../../common/constants";
import { useEffect, useState } from "react";
import { getUserRole } from "../../services/ApiService";
import UnAuthorized from "./UnAuthorized";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const [userRoleId, setUserRoleId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await getUserRole();
        setUserRoleId(response.user_role);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  let userDetails = sessionStorage.getItem("userDetails");

  if (!userDetails) {
    return <Navigate to={LOGIN} state={{ from: location }} replace />;
  }

  const parsedUser = JSON.parse(userDetails);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userRoleId !== parseInt(parsedUser.group_id)) {
    return <UnAuthorized />;
  }

  return children;
};

export default ProtectedRoute;
