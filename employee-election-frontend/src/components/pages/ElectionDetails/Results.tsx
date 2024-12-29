import { Box, Button, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import {
  DashboardElectionDetails,
  DistributionOfVotesNumber,
  EmpVoteList,
  overviewData,
  resultsTableData,
} from "../../../interfaces/election.interface";
import { BarChart, DonutChart } from "@mantine/charts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getElectionResultsCharts,
  getElectionResultsTable,
  getElectionWinnerDetails,
  getEmpVoteList,
  updateElectionDetails,
} from "../../../services/ApiService";
import CountCard from "../../common/CountCard";
import { ColumnData } from "../../../interfaces/common.interface";
import FlatTable from "../../common/FlatTable";
import { fetchUserDetails } from "../../../common/utils";
import DownloadReportButton from "./DownloadReport";
import { toast } from "../../../common/toast/ToastService";

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const electionId = id;
  const userDetails = fetchUserDetails();
  const [winnerDetails, setWinnerDetails] = useState<overviewData[]>([]);
  const [distributionOfVotesNumber, setDistributionOfVotesNumber] = useState<
    DistributionOfVotesNumber[]
  >([]);
  const [distributionOfVotesPercent, setDistributionOfVotesPercent] = useState(
    []
  );
  const [StatCards, setStatCards] = useState([]);
  const [resultsColData, setResultsColData] = useState<ColumnData[]>([]);
  const [resultsRowData, setResultsRowData] = useState<resultsTableData[]>([]);
  const [empVoteList, setEmpVoteList] = useState<EmpVoteList[]>([]);
  const [electionDetails, setElectionDetails] =
    useState<DashboardElectionDetails | null>(null);
  const [isPublishResults, setIsPublishResults] = useState<boolean>(false);

  const fetchWinnerDetails = async () => {
    if (electionId) {
      const response = await getElectionWinnerDetails(
        electionId,
        userDetails.user_id
      );
      setWinnerDetails(response);
    }
  };

  const fetchChartData = async () => {
    if (electionId) {
      const response = await getElectionResultsCharts(electionId);
      setDistributionOfVotesNumber(response.distribution_of_votes_number);
      setDistributionOfVotesPercent(response.distribution_of_votes_percentage);
      setStatCards(response.stat_cards);
    }
  };

  const fetchResultsTable = async () => {
    if (electionId) {
      const response = await getElectionResultsTable(electionId);
      setResultsColData(response.col_data);
      setResultsRowData(response.row_data);
    }
  };

  const fetchEmpVoteList = async () => {
    if (electionId) {
      const response = await getEmpVoteList(electionId);
      setEmpVoteList(response.emp_vote_list);
      setElectionDetails(response.election_details);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchWinnerDetails();
      await fetchChartData();
      await fetchResultsTable();
      await fetchEmpVoteList();
    };

    fetchData();
  }, [electionId]);

  const onPublishResult = async () => {
    if (electionId) {
      const requestBody = {
        results_published_date: new Date(),
      };
      const response = await updateElectionDetails(
        requestBody,
        parseInt(electionId)
      );
      if (response) {
        setIsPublishResults(true);
        toast.success("Results published successfully");
      }
    }
  };

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
          {userDetails.group_id === 1 && (
            <Group>
              <Button onClick={onPublishResult} disabled={isPublishResults}>
                Publish Results
              </Button>
              <DownloadReportButton
                StatCards={StatCards}
                resultsColData={resultsColData}
                resultsRowData={resultsRowData}
                winnerDetails={winnerDetails}
                empVoteList={empVoteList}
                electionDetails={electionDetails}
              />
            </Group>
          )}
        </Group>
      </>
    );
  };

  const renderCharts = () => {
    return (
      <>
        <Flex
          align="flex-start"
          wrap="nowrap"
          gap="md"
          direction={{ base: "column", md: "row" }}
        >
          <Paper mt="lg" p="md" w={{ base: "100%", md: "40%" }}>
            <Text className="text-center" fw={700} component="h1" mb="lg">
              Distribution of votes
            </Text>
            <BarChart
              h={235}
              data={distributionOfVotesNumber}
              dataKey="user_name"
              maxBarWidth={40}
              series={[{ name: "total_votes", color: "url(#barGradient)" }]}
              tickLine="y"
              yAxisProps={{ domain: [0, 100] }}
            >
              <svg>
                <defs>
                  <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--mantine-color-orange-1)"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--mantine-color-orange-6)"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </BarChart>
          </Paper>
          <Paper mt="lg" p="md" w={{ base: "100%", md: "30%" }}>
            <Text className="text-center" fw={700} component="h1" mb="lg">
              Distribution of votes in (%)
            </Text>
            <DonutChart
              h={200}
              data={distributionOfVotesPercent}
              tooltipDataSource="segment"
              mx="auto"
              withLabels
            />
          </Paper>

          <Box mt="lg" w={{ base: "100%", md: "28%" }}>
            <CountCard type="stack" cardsData={StatCards} />
          </Box>
        </Flex>
      </>
    );
  };

  return (
    <>
      {renderWinnerDetails()}
      {renderCharts()}
      <FlatTable colData={resultsColData} rowData={resultsRowData} />
    </>
  );
};

export default Results;
