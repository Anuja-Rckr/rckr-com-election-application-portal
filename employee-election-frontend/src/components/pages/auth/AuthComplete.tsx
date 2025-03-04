import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../services/ApiService";
import { DASHBOARD, LOGIN } from "../../../common/constants";

const AuthComplete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getUserInfo();
      if (response) {
        sessionStorage.setItem("userDetails", JSON.stringify(response));
        navigate(DASHBOARD);
      } else {
        navigate(LOGIN);
      }
    };

    fetchUserData();
  }, [navigate]);

  return <p>Authenticating...</p>;
};

export default AuthComplete;
