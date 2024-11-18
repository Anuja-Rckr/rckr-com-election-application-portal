import { Avatar, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  formatDate,
  generateRandomColor,
  getInitials,
} from "../../common/utils";
import { DATETIME } from "../../common/constants";
import {
  NominationCardDetails,
  overviewData,
} from "../../interfaces/election.interface";

const NavigationTab = () => {
  const nominationDetails: overviewData[] = [
    {
      title: "Start Date",
      value: "2024-10-31T17:00:00Z",
      type: "datetime",
    },
    {
      title: "End Date",
      value: "2024-10-31T17:00:00Z",
      type: "datetime",
    },
    {
      title: "Total Nominations",
      value: "20",
      type: "data",
    },
  ];

  const nominees: NominationCardDetails[] = [
    {
      empid: "EMP001",
      name: "John Doe",
      role: "Software Engineer",
      appeal: "Requesting extended leave due to medical reasons",
    },
    {
      empid: "EMP002",
      name: "Jane Smith",
      role: "Project Manager",
      appeal: "Appealing for a promotion consideration",
    },
    {
      empid: "EMP003",
      name: "Robert Johnson",
      role: "QA Analyst",
      appeal: "Appealing a recent performance review",
    },
    {
      empid: "EMP004",
      name: "Emily Davis",
      role: "UX Designer",
      appeal: "Requesting change of team for skill development",
    },
    {
      empid: "EMP005",
      name: "Michael Brown",
      role: "DevOps Engineer",
      appeal: "Appealing for additional budget approval",
    },
    {
      empid: "EMP006",
      name: "Jessica Wilson",
      role: "Business Analyst",
      appeal: "Appealing to work remotely for the next quarter",
    },
    {
      empid: "EMP007",
      name: "David Martinez",
      role: "Data Scientist",
      appeal: "Requesting approval for training on new tools",
    },
    {
      empid: "EMP008",
      name: "Sarah Miller",
      role: "Content Strategist",
      appeal: "Appealing for a shift adjustment",
    },
    {
      empid: "EMP009",
      name: "Chris Garcia",
      role: "Database Administrator",
      appeal: "Requesting database server upgrade",
    },
    {
      empid: "EMP010",
      name: "Linda Lee",
      role: "Human Resources",
      appeal: "Appealing for a change in department policies",
    },
  ];

  const renderNominationDetails = () => {
    return (
      <>
        <Paper className="bg-overview width-fit-content" p="sm">
          <Group justify="center">
            {nominationDetails.map((item, index) => (
              <Stack
                key={index}
                gap={0}
                className={
                  nominationDetails.length - 1 === index
                    ? "text-center"
                    : "border-right text-center"
                }
                pr="sm"
              >
                <Text>{item.title}</Text>
                <Text>
                  {item.type === DATETIME ? formatDate(item.value) : item.value}
                </Text>
              </Stack>
            ))}
          </Group>
        </Paper>
      </>
    );
  };

  const renderNominationList = () => {
    return (
      <>
        <SimpleGrid cols={5} spacing="md" mt="lg">
          {nominees.map((item, index) => (
            <Paper withBorder p="md" radius="md" key={item.empid}>
              <Group justify="center" align="center">
                <Avatar color={generateRandomColor(item.name)} radius="xl">
                  {getInitials(item.name)}
                </Avatar>
                <div>
                  <Group justify="apart" align="center">
                    <Text className="text-center" fw={500}>
                      Emp Id:
                    </Text>
                    <Text className="text-center">{item.empid}</Text>
                  </Group>
                  <Group justify="apart" align="center">
                    <Text className="text-center" fw={500}>
                      Name:
                    </Text>
                    <Text className="text-center">{item.name}</Text>
                  </Group>
                  <Group justify="apart" align="center">
                    <Text className="text-center" fw={500}>
                      Role:
                    </Text>
                    <Text className="text-center">{item.role}</Text>
                  </Group>
                </div>
              </Group>
              <Group justify="center" gap={0}>
                <Text className="text-center" fw={500}>
                  Appeal:
                </Text>
                <Text className="text-center">{item.appeal}</Text>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </>
    );
  };

  return (
    <>
      <Paper p="md">
        {renderNominationDetails()}
        {renderNominationList()}
      </Paper>
    </>
  );
};

export default NavigationTab;
