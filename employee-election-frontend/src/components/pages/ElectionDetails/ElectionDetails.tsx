import {
  Badge,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
  Timeline,
} from "@mantine/core";
import {
  IconBook,
  IconReportAnalytics,
  IconThumbUp,
  IconUsers,
} from "@tabler/icons-react";
import {
  CLOSED,
  COMPLETED,
  DATA,
  DATETIME,
  DECLARED,
  LIVE,
  NOMINATIONS,
  OVERVIEW,
  RESULTS,
  STATUS,
} from "../../../common/constants";
import {
  formatDate,
  getActiveNumber,
  getColorForStatus,
} from "../../../common/utils";
import {
  ElectionDetailsInterface,
  overviewData,
} from "../../../interfaces/election.interface";
import NominationTab from "../ElectionDetails/NominationTab";
import Results from "./Results";
import { useEffect, useState } from "react";
import {
  getElectionOverview,
  getElectionTimeline,
} from "../../../services/ApiService";
import { useParams } from "react-router-dom";
import { ElectionTimelineDetails } from "../../../interfaces/common.interface";

const ElectionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const electionId = id;
  const [electionOverviewDetails, setElectionOverviewDetails] = useState<
    overviewData[]
  >([]);
  const [electionTimelineDetails, setElectionTimelineDetails] =
    useState<ElectionTimelineDetails | null>(null);
  const [electionStatus, setElectionStatus] = useState<string>("Declared");

  const fetchElectionOverviewDetails = async () => {
    if (electionId) {
      const response = await getElectionOverview(electionId);
      setElectionOverviewDetails(response);
      const status = response.find(
        (item: overviewData) => item.type === "status"
      );
      setElectionStatus(status.value);
    }
  };

  const fetchElectionTimelineDetails = async () => {
    if (electionId) {
      const response = await getElectionTimeline(electionId);
      setElectionTimelineDetails(response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchElectionOverviewDetails();
      await fetchElectionTimelineDetails();
    };

    fetchData();
  }, [electionId]);

  const renderOverview = () => {
    return (
      <>
        <Paper className="bg-overview" p="sm" mb="lg" mt="lg">
          <Group justify="space-around">
            {electionOverviewDetails.map((item, index) =>
              item.type === DATA ? (
                <Stack gap={0} className="border-right" pr="sm" key={index}>
                  <Text fw={700} className="text-center">
                    {item.title}
                  </Text>
                  <Text className="text-center">{item.value}</Text>
                </Stack>
              ) : item.type === DATETIME ? (
                <Stack gap={0} className="border-right" pr="sm" key={index}>
                  <Text fw={700} className="text-center">
                    {item.title}
                  </Text>
                  <Text className="text-center">{formatDate(item.value)}</Text>
                </Stack>
              ) : item.type === STATUS ? (
                <Stack
                  gap={0}
                  className={
                    electionOverviewDetails.length === index
                      ? "border-right"
                      : ""
                  }
                  pr="sm"
                  key={index}
                >
                  <Text fw={700} className="text-center">
                    {item.title}
                  </Text>
                  <Badge color={getColorForStatus(item.value)}>
                    {item.value}
                  </Badge>
                </Stack>
              ) : null
            )}
          </Group>
        </Paper>
      </>
    );
  };

  const renderTimeline = () => {
    return (
      <>
        <Paper p="md">
          <Timeline
            active={getActiveNumber(electionStatus)}
            bulletSize={24}
            lineWidth={2}
          >
            <Timeline.Item
              bullet={<IconUsers size={15} />}
              title="Nomination Phase"
              lineVariant={
                electionStatus === DECLARED || electionStatus === NOMINATIONS
                  ? "dashed"
                  : "solid"
              }
            >
              {electionStatus === DECLARED && (
                <>
                  <Text c="dimmed" size="sm">
                    Nomination Process is yet to be scheduled
                  </Text>
                </>
              )}
              {electionStatus === NOMINATIONS && (
                <>
                  <Text c="dimmed" size="sm">
                    Nomination Process is LIVE
                  </Text>
                </>
              )}
              {(electionStatus === COMPLETED ||
                electionStatus === CLOSED ||
                electionStatus === LIVE) && (
                <>
                  <Text c="dimmed" size="sm">
                    Start Date:{" "}
                    <b>
                      {electionTimelineDetails?.election_details
                        .nomination_start_date
                        ? formatDate(
                            electionTimelineDetails?.election_details
                              .nomination_start_date
                          )
                        : ""}
                    </b>
                  </Text>
                  <Text c="dimmed" size="sm" mt="xs" mb="xs">
                    End Date:{" "}
                    <b>
                      {electionTimelineDetails?.election_details
                        .nomination_end_date
                        ? formatDate(
                            electionTimelineDetails?.election_details
                              .nomination_end_date
                          )
                        : ""}
                    </b>
                  </Text>
                  <Text c="dimmed" size="sm">
                    Total Nominations:{" "}
                    <b>
                      {
                        electionTimelineDetails?.election_count_data
                          .total_nominations
                      }{" "}
                      Nominations
                    </b>
                  </Text>
                </>
              )}
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconThumbUp size={15} />}
              title="Voting Phase"
              lineVariant={electionStatus === CLOSED ? "solid" : "dashed"}
            >
              {(electionStatus === DECLARED ||
                electionStatus === NOMINATIONS) && (
                <>
                  <Text c="dimmed" size="sm">
                    Voting Process yet to scheduled
                  </Text>
                </>
              )}
              {electionStatus === LIVE && (
                <>
                  <Text c="dimmed" size="sm">
                    Voting Process is in LIVE
                  </Text>
                </>
              )}
              {(electionStatus === COMPLETED || electionStatus === CLOSED) && (
                <>
                  <Text c="dimmed" size="sm">
                    Start Date:{" "}
                    <b>
                      <b>
                        {electionTimelineDetails?.election_details
                          .voting_start_date
                          ? formatDate(
                              electionTimelineDetails?.election_details
                                .voting_start_date
                            )
                          : ""}
                      </b>
                    </b>
                  </Text>
                  <Text c="dimmed" size="sm" mt="xs" mb="xs">
                    End Date:{" "}
                    <b>
                      {electionTimelineDetails?.election_details.voting_end_date
                        ? formatDate(
                            electionTimelineDetails?.election_details
                              .voting_end_date
                          )
                        : ""}
                    </b>
                  </Text>
                  <Text c="dimmed" size="sm">
                    Total Votes:{" "}
                    <b>
                      {electionTimelineDetails?.election_count_data.total_votes}{" "}
                      Votes
                    </b>
                  </Text>
                </>
              )}
            </Timeline.Item>

            <Timeline.Item
              title="Results"
              bullet={<IconReportAnalytics size={15} />}
            >
              {electionStatus !== COMPLETED && electionStatus !== CLOSED && (
                <>
                  <Text c="dimmed" size="sm">
                    Once above phases are completed results will be published
                  </Text>
                </>
              )}
              {electionStatus === COMPLETED && (
                <>
                  <Text c="dimmed" size="sm">
                    Results are yet to publish
                  </Text>
                </>
              )}
              {electionStatus === CLOSED && (
                <>
                  <Text c="dimmed" size="sm">
                    Published On:{" "}
                    <b>
                      {electionTimelineDetails?.election_details
                        .results_published_date
                        ? formatDate(
                            electionTimelineDetails?.election_details
                              .results_published_date
                          )
                        : ""}
                    </b>
                  </Text>
                </>
              )}
            </Timeline.Item>
          </Timeline>
        </Paper>
      </>
    );
  };
  return (
    <>
      <Tabs defaultValue={OVERVIEW}>
        <Tabs.List>
          <Tabs.Tab value={OVERVIEW} leftSection={<IconBook />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab
            value={NOMINATIONS}
            leftSection={<IconUsers />}
            disabled={electionStatus === DECLARED}
          >
            Nominations
          </Tabs.Tab>
          <Tabs.Tab
            value={RESULTS}
            leftSection={<IconReportAnalytics />}
            disabled={electionStatus !== CLOSED}
          >
            Results
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={OVERVIEW}>
          {renderOverview()}
          {renderTimeline()}
        </Tabs.Panel>

        <Tabs.Panel value={NOMINATIONS}>
          {electionStatus !== DECLARED && <NominationTab />}
        </Tabs.Panel>

        <Tabs.Panel value={RESULTS}>
          {electionStatus === CLOSED && <Results />}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ElectionDetails;
