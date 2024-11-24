import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { LIGHT } from "../../common/constants";
import type { CountCardPropsInterface } from "../../interfaces/common.interface";
import { getIcon } from "../../common/utils";

export const CountCard = (props: CountCardPropsInterface) => {
  const { type = "grid", cardsData } = props;
  return (
    <>
      {type === "grid" && (
        <SimpleGrid cols={5} spacing="md">
          {cardsData.map((stat, index) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <Paper withBorder={false} p="md" radius="md" key={stat.title}>
                <Group justify="apart">
                  <ThemeIcon variant="light" size={45} radius="md">
                    {IconComponent && <IconComponent size={28} />}
                  </ThemeIcon>
                  <div>
                    <Text c="dimmed">{stat.title}</Text>
                    <Text fw={400} fz="xl">
                      {stat.value}
                    </Text>
                  </div>
                </Group>
              </Paper>
            );
          })}
        </SimpleGrid>
      )}

      {type === "stack" && (
        <Stack>
          {cardsData.map((stat, index) => {
            const IconComponent = getIcon(stat.icon);
            return (
              <Paper withBorder={false} p="md" radius="md" key={index}>
                <Group justify="apart">
                  <ThemeIcon variant="light" size={45} radius="md">
                    {IconComponent && <IconComponent size={28} />}
                  </ThemeIcon>
                  <div>
                    <Text c="dimmed">{stat.title}</Text>
                    <Text fw={400} fz="xl">
                      {stat.value}
                    </Text>
                  </div>
                </Group>
              </Paper>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default CountCard;
