import { Group, Image, Text } from "@mantine/core";
import unauthorizedImage from "../../../src/assets/unauthorized.png";

const UnAuthorized = () => {
  return (
    <Group className="unauthorized-image">
      <Image src={unauthorizedImage} alt="Unauthorized Access" />
    </Group>
  );
};

export default UnAuthorized;
