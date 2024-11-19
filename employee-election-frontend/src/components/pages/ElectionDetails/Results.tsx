import { Group, Paper, Stack, Text } from "@mantine/core";
import { overviewData } from "../../../interfaces/election.interface";

const Results = () => {
  const winnerDetails: overviewData[] = [
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
  return (
    <>
      <Paper className="bg-overview width-fit-content" p="sm" mt="lg">
        <Group justify="center">
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
    </>
  );
};

export default Results;
