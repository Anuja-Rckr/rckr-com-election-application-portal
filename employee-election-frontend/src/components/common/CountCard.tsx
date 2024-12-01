import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import type { CountCardPropsInterface } from "../../interfaces/common.interface";
import { getIcon } from "../../common/utils";

export const CountCard = (props: CountCardPropsInterface) => {
  const { type = "grid", cardsData } = props;

  const renderCardContent = (stat: any) => {
    const IconComponent = getIcon(stat.icon);
    return (
      <Paper withBorder={false} p="md" radius="md" h="100%">
        <Group justify="apart" align="center">
          <ThemeIcon variant="light" size={45} radius="md">
            {IconComponent && <IconComponent size={28} />}
          </ThemeIcon>
          <div className="card-text-overflow">
            <Text c="dimmed" truncate="end" style={{ maxWidth: "100%" }}>
              {stat.title}
            </Text>
            <Text fw={400} fz="xl" truncate="end">
              {stat.value}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  };

  return (
    <>
      {type === "grid" && (
        <SimpleGrid
          cols={{
            base: 2,
            md: 5,
          }}
          spacing="md"
        >
          {cardsData.map((stat, index) => (
            <div key={stat.title || index}>{renderCardContent(stat)}</div>
          ))}
        </SimpleGrid>
      )}

      {type === "stack" && (
        <Stack>
          {cardsData.map((stat, index) => (
            <div key={stat.title || index}>{renderCardContent(stat)}</div>
          ))}
        </Stack>
      )}
    </>
  );
};

export default CountCard;
