import { Badge, Group, Paper, Stack, Tabs, Text } from "@mantine/core";
import { IconBook, IconChartBar, IconUsers } from "@tabler/icons-react";
import { NOMINATIONS, OVERVIEW, RESULTS } from "../../common/constants";
import { formatDate, getColorForStatus } from "../../common/utils";

const ElectionDetails = () => {
  const renderOverview = () => {
    return (
      <>
        <Paper>
          <Paper className="bg-overview" p="sm">
            <Group justify="space-around">
              <Stack gap={0} className="border-right" pr="sm">
                <Text fw={700} className="text-center">
                  Title
                </Text>
                <Text className="text-center">Best Performance 2023</Text>
              </Stack>
              <Stack gap={0} className="border-right" pr="sm">
                <Text fw={700} className="text-center">
                  Created By
                </Text>
                <Text className="text-center">Anuja Aliveli</Text>
              </Stack>
              <Stack gap={0} className="border-right" pr="sm">
                <Text fw={700} className="text-center">
                  Created At
                </Text>
                <Text className="text-center">
                  {formatDate("2024-10-31T17:00:00Z")}
                </Text>
              </Stack>
              <Stack gap={0} className="border-right" pr="sm">
                <Text fw={700} className="text-center">
                  Cutoff
                </Text>
                <Text className="text-center">50</Text>
              </Stack>
              <Stack gap={0} className="border-right" pr="sm">
                <Text fw={700} className="text-center">
                  Reward
                </Text>
                <Text className="text-center">Rs.1000</Text>
              </Stack>

              <Stack gap={0} pr="sm">
                <Text fw={700} className="text-center">
                  Election Status
                </Text>
                <Badge
                  color={getColorForStatus("Declared")}
                  className="text-center"
                >
                  Declared
                </Badge>
              </Stack>
            </Group>
          </Paper>
        </Paper>
      </>
    );
  };
  return (
    <>
      <Paper p="md">
        <Tabs defaultValue={OVERVIEW}>
          <Tabs.List>
            <Tabs.Tab value={OVERVIEW} leftSection={<IconBook />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value={NOMINATIONS} leftSection={<IconUsers />}>
              Nominations
            </Tabs.Tab>
            <Tabs.Tab value={RESULTS} leftSection={<IconChartBar />}>
              Results
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={OVERVIEW} p="md">
            {renderOverview()}
          </Tabs.Panel>

          <Tabs.Panel value={NOMINATIONS}>Nominations tab content</Tabs.Panel>

          <Tabs.Panel value={RESULTS}>Results tab content</Tabs.Panel>
        </Tabs>
      </Paper>
    </>
  );
};

export default ElectionDetails;
