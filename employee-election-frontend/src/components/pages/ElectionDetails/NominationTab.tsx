import { Avatar, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  formatDate,
  generateRandomColor,
  getInitials,
} from "../../../common/utils";
import { DATETIME } from "../../../common/constants";
import {
  NominationCardDetails,
  overviewData,
} from "../../../interfaces/election.interface";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getElectionNominationCandidateList,
  getElectionNominationDetails,
} from "../../../services/ApiService";

const NominationTab = () => {
  const { id } = useParams<{ id: string }>();
  const electionId = id;
  const [nominationDetails, setNominationDetails] = useState<overviewData[]>(
    []
  );

  const [nominationList, setNominationList] = useState<NominationCardDetails[]>(
    []
  );

  const fetchNominationDetails = async () => {
    if (electionId) {
      const response = await getElectionNominationDetails(electionId);
      setNominationDetails(response);
    }
  };

  const fetchNominationList = async () => {
    if (electionId) {
      const response = await getElectionNominationCandidateList(electionId);
      setNominationList(response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchNominationDetails();
      await fetchNominationList();
    };
    fetchData();
  }, [electionId]);

  const renderNominationDetails = () => {
    return (
      <>
        <Paper className="bg-overview width-fit-content" p="sm" mt="lg">
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
        <SimpleGrid cols={{ base: 1, md: 5 }} spacing="md" mt="lg">
          {nominationList.map((item, index) => (
            <Paper p="md" radius="md" key={item.user_id}>
              <Stack justify="center" align="center">
                <Avatar color={generateRandomColor(item.user_name)} radius="xl">
                  {getInitials(item.user_name)}
                </Avatar>
                <div>
                  <Group justify="apart" align="center">
                    <Text className="text-center" fw={500}>
                      Name:
                    </Text>
                    <Text className="text-center">{item.user_name}</Text>
                  </Group>
                </div>
              </Stack>
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
      {renderNominationDetails()}
      {renderNominationList()}
    </>
  );
};

export default NominationTab;
