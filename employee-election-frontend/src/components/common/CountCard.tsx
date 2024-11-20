import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { IconCheck, IconUserPlus, IconArrowUpRight } from "@tabler/icons-react";
import { LIGHT } from "../../common/constants";
import type { CountCardInterface } from "../../interfaces/common.interface";

const data: CountCardInterface[] = [
  { title: "Total", value: 13, icon: <IconArrowUpRight size={28} /> },
  { title: "Declared", value: 12, icon: <IconCheck size={28} /> },
  { title: "Nomination", value: 74, icon: <IconUserPlus size={28} /> },
];

export const CountCard = (props: { type?: string }) => {
  const { type = "grid" } = props;

  return (
    <>
      {type === "grid" && (
        <SimpleGrid cols={5} spacing="md">
          {data.map((stat, index) => (
            <Paper withBorder={false} p="md" radius="md" key={stat.title}>
              <Group justify="apart">
                <ThemeIcon variant={LIGHT} size={45} radius="md">
                  {stat.icon}
                </ThemeIcon>
                <div>
                  <Text c="dimmed">{stat.title}</Text>
                  <Text fw={400} fz="xl">
                    {stat.value}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      )}

      {type === "stack" && (
        <Stack>
          {data.map((stat, index) => (
            <Paper withBorder={false} p="md" radius="md" key={index}>
              <Group justify="apart">
                <ThemeIcon variant={LIGHT} size={45} radius="md">
                  {stat.icon}
                </ThemeIcon>
                <div>
                  <Text c="dimmed">{stat.title}</Text>
                  <Text fw={400} fz="xl">
                    {stat.value}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </>
  );
};

export default CountCard;
