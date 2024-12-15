import { Box, Button, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import {
  DistributionOfVotesNumber,
  DistributionOfVotesPercentage,
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
} from "../../../services/ApiService";
import CountCard from "../../common/CountCard";
import { ColumnData } from "../../../interfaces/common.interface";
import FlatTable from "../../common/FlatTable";
import { getUserDetails } from "../../../common/utils";
import DownloadReportButton from "./DownloadReport";

const Results = () => {
  console.log("rrrr");
  const { id } = useParams<{ id: string }>();
  const electionId = id;
  const empDetails = getUserDetails();
  const [winnerDetails, setWinnerDetails] = useState<overviewData[]>([]);
  const [distributionOfVotesNumber, setDistributionOfVotesNumber] = useState<
    DistributionOfVotesNumber[]
  >([]);
  const [distributionOfVotesPercent, setDistributionOfVotesPercent] = useState(
    []
  );
  const [StatCards, setStatCards] = useState([]);
  const [electionCutOff, setElectionCutOff] = useState();
  const [resultsColData, setResultsColData] = useState<ColumnData[]>([]);
  const [resultsRowData, setResultsRowData] = useState<resultsTableData[]>([]);

  const fetchWinnerDetails = async () => {
    if (electionId) {
      const response = await getElectionWinnerDetails(
        electionId,
        empDetails.empId
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
      const cutoff = response.stat_cards.find(
        (item: any) => item.title === "Election Cutoff"
      );
      setElectionCutOff(cutoff.value);
    }
  };

  const fetchResultsTable = async () => {
    if (electionId) {
      const response = await getElectionResultsTable(electionId);
      setResultsColData(response.col_data);
      setResultsRowData(response.row_data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchWinnerDetails();
      await fetchChartData();
      await fetchResultsTable();
    };

    fetchData();
  }, [electionId]);

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
          {empDetails.isAdmin && (
            <DownloadReportButton
              StatCards={StatCards}
              resultsColData={resultsColData}
              resultsRowData={resultsRowData}
              winnerDetails={winnerDetails}
            />
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
              dataKey="emp_name"
              maxBarWidth={40}
              series={[{ name: "total_votes", color: "url(#barGradient)" }]}
              referenceLines={[
                {
                  y: electionCutOff,
                  color: "red.5",
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
