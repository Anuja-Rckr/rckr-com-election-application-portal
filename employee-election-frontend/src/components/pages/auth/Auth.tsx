import { Button, Group, Image, Text } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import VoteImage from "../../../assets/rb_4448.png";

const Auth = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const onGoogleSignin = async () => {
    if (process.env.REACT_APP_REDIRECT_URL === undefined) {
      throw new Error("LOGIN URL not defined");
    }
    const redirectUri = process.env.REACT_APP_REDIRECT_URL;
    window.location.href = redirectUri;
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
            gradient={{ from: "red", to: "indigo", deg: 90 }}
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
