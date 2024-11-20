import { Box, Button, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { overviewData } from "../../../interfaces/election.interface";
import { BarChart, DonutChart } from "@mantine/charts";
import CountCard from "../../common/CountCard";
import FlatTable from "../../common/FlatTable";

const Results = () => {
  const winnerDetails: overviewData[] = [
    {
      title: "EmpId",
      value: "123",
      type: "data",
    },
    {
      title: "Name",
      value: "John",
      type: "data",
    },
    {
      title: "Role",
      value: "Software Engineer",
      type: "data",
    },
    {
      title: "Total Votes",
      value: "20",
      type: "data",
    },
    {
      title: "Total Votes",
      value: "20%",
      type: "data",
    },
  ];

  const data = [
    {
      name: "Harnek",
      votes: 35,
    },
    {
      name: "Sandya",
      votes: 53,
    },
    {
      name: "Nandu",
      votes: 73,
    },
    {
      name: "Prem",
      votes: 89,
    },
    {
      name: "Anuja",
      votes: 64,
    },
  ];

  const doughnutData = [
    {
      name: "Harnek",
      value: 35,
      color: "violet.0",
    },
    {
      name: "Sandya",
      value: 53,
      color: "violet.1",
    },
    {
      name: "Nandu",
      value: 73,
      color: "violet.2",
    },
    {
      name: "Prem",
      value: 89,
      color: "violet.3",
    },
    {
      name: "Anuja",
      value: 64,
      color: "violet.4",
    },
  ];

  const renderWinnerDetails = () => {
    return (
      <>
        <Group justify="space-between" align="flex-end">
          <Paper className="bg-overview width-fit-content" p="sm" mt="lg">
            <Group justify="center">
              <Text fw={900}>Winner of the Election</Text>
              {winnerDetails.map((item, index) => (
                <Stack
                  key={index}
                  gap={0}
                  className={
                    winnerDetails.length - 1 === index
                      ? "text-center"
                      : "border-right text-center"
                  }
                  pr="sm"
                >
                  <Text>{item.title}</Text>
                  <Text>{item.value}</Text>
                </Stack>
              ))}
            </Group>
          </Paper>
          <Button>Download Report</Button>
        </Group>
      </>
    );
  };

  const renderCharts = () => {
    return (
      <>
        <Flex align="flex-start" wrap="nowrap" gap="md">
          <Paper mt="lg" p="md" w="40%">
            <Text className="text-center" fw={700} component="h1" mb="lg">
              Distribution of votes
            </Text>
            <BarChart
              h={235}
              data={data}
              dataKey="name"
              maxBarWidth={40}
              series={[{ name: "votes", color: "url(#barGradient)" }]}
              referenceLines={[
                {
                  y: 45,
                  color: "grape.5",
                  label: "Cutoff",
                  labelPosition: "top",
                },
              ]}
              tickLine="y"
              yAxisProps={{ domain: [0, 100] }}
            >
              <svg>
                <defs>
                  <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--mantine-color-violet-1)"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--mantine-color-violet-6)"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </BarChart>
          </Paper>
          <Paper mt="lg" p="md" w="30%">
            <Text className="text-center" fw={700} component="h1" mb="lg">
              Distribution of votes in (%)
            </Text>
            <DonutChart
              h={200}
              data={doughnutData}
              tooltipDataSource="segment"
              mx="auto"
              withLabels
            />
          </Paper>

          <Box mt="lg" w="28%">
            <CountCard type="stack" />
          </Box>
        </Flex>
      </>
    );
  };

  return (
    <>
      {renderWinnerDetails()}
      {renderCharts()}
      <FlatTable />
    </>
  );
};

export default Results;
