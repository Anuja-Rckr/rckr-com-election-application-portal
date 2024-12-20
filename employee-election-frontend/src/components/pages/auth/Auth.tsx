import { Button } from "@mantine/core";
import { getUserInfo } from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../common/constants";

const Auth = () => {
  const navigate = useNavigate();

  const onGoogleSignin = async () => {
    const response = await getUserInfo();
    if (response) {
      sessionStorage.setItem("userDetails", JSON.stringify(response));
      navigate(DASHBOARD);
    }
  };

  return (
    <>
      <Button onClick={onGoogleSignin}>Google Sign IN</Button>
    </>
  );
};

export default Auth;
