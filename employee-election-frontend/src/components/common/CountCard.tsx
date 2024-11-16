import { Group, Paper, Text, ThemeIcon, SimpleGrid } from "@mantine/core";
import {
  IconCheck,
  IconUserPlus,
  IconClipboardCheck,
  IconX,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { LIGHT } from "../../common/constants";
import type { CountCardInterface } from "../../interfaces/common.interface";

const data: CountCardInterface[] = [
  { title: "Total", value: 13, icon: <IconArrowUpRight size={28} /> },
  { title: "Declared", value: 12, icon: <IconCheck size={28} /> },
  { title: "Nomination", value: 74, icon: <IconUserPlus size={28} /> },
  { title: "Completed", value: 75, icon: <IconClipboardCheck size={28} /> },
  { title: "Closed", value: 79, icon: <IconX size={28} /> },
];

export function CountCard() {
  return (
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
  );
}

export default CountCard;
