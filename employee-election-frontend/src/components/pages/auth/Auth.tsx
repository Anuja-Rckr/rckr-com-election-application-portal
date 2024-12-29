import { Button, Group, Image, Text } from "@mantine/core";
import { getUserInfo } from "../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../../common/constants";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import VoteImage from "../../../assets/rb_4448.png";

const Auth = () => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const onGoogleSignin = async () => {
    const response = await getUserInfo();
    if (response) {
      sessionStorage.setItem("userDetails", JSON.stringify(response));
      navigate(DASHBOARD);
    }
  };

  return (
    <>
      <Group className="container">
        {isLargeScreen && (
          <Group className="image-container">
            <Image src={VoteImage} alt="Logo" />
          </Group>
        )}
        <Group className="google-btn-container">
          <Text className="primary-text">Election Management System</Text>
          <Text className="secondary-text">
            Empowering employees through transparent elections.
          </Text>
          <Button
            onClick={onGoogleSignin}
            variant="gradient"
            gradient={{ from: "pink", to: "orange", deg: 90 }}
            leftSection={<IconBrandGoogleFilled size={20} />}
          >
            Login with Google
          </Button>
        </Group>
      </Group>
    </>
  );
};

export default Auth;
