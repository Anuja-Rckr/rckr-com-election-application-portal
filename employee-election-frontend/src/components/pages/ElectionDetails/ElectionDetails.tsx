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
  DATA,
  DATETIME,
  ELECTION_ANNOUNCED,
  NOMINATIONS,
  NOMINATIONS_ANNOUNCED,
  NOMINATIONS_COMPLETED,
  NOMINATIONS_LIVE,
  OVERVIEW,
  RESULTS,
  VOTING_ANNOUNCED,
  VOTING_COMPLETED,
  VOTING_LIVE,
} from "../../../common/constants";
import {
  formatDate,
  getActiveNumber,
  getColorForStatus,
  getElectionStatus,
  isDateValid,
} from "../../../common/utils";
import { overviewData } from "../../../interfaces/election.interface";
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
  const [electionStatus, setElectionStatus] =
    useState<string>(ELECTION_ANNOUNCED);

  const fetchElectionOverviewDetails = async () => {
    if (electionId) {
      const response = await getElectionOverview(electionId);
      setElectionOverviewDetails(response.overview_list);
      setElectionStatus(getElectionStatus(response.election_details));
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
            {electionOverviewDetails.map((item, index) => {
              if (item.type === DATA) {
                return (
                  <Stack gap={0} className="border-right" pr="sm" key={index}>
                    <Text fw={700} className="text-center">
                      {item.title}
                    </Text>
                    <Text className="text-center">{item.value}</Text>
                  </Stack>
                );
              } else if (item.type === DATETIME) {
                return (
                  <Stack gap={0} className="border-right" pr="sm" key={index}>
                    <Text fw={700} className="text-center">
                      {item.title}
                    </Text>
                    <Text className="text-center">
                      {formatDate(item.value)}
                    </Text>
                  </Stack>
                );
              }
            })}

            <Stack gap={0} pr="sm">
              <Text fw={700} className="text-center">
                Election Status
              </Text>
              <Badge color={getColorForStatus(electionStatus)}>
                {electionStatus}
              </Badge>
            </Stack>
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
                [
                  ELECTION_ANNOUNCED,
                  NOMINATIONS_ANNOUNCED,
                  NOMINATIONS_LIVE,
                  NOMINATIONS_COMPLETED,
                ].includes(electionStatus)
                  ? "dashed"
                  : "solid"
              }
            >
              {electionStatus === ELECTION_ANNOUNCED && (
                <>
                  <Text c="dimmed" size="sm">
                    Nomination Process is yet to be scheduled
                  </Text>
                </>
              )}
              {electionStatus === NOMINATIONS_LIVE && (
                <>
                  <Text c="dimmed" size="sm">
                    Nomination Process is LIVE
                  </Text>
                </>
              )}
              {electionStatus === NOMINATIONS_ANNOUNCED && (
                <>
                  <Text c="dimmed" size="sm" mb="xs">
                    Nominations will be live from:
                  </Text>
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
                </>
              )}

              {![
                NOMINATIONS_ANNOUNCED,
                ELECTION_ANNOUNCED,
                NOMINATIONS_ANNOUNCED,
              ].includes(electionStatus) && (
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
              {[
                NOMINATIONS_ANNOUNCED,
                NOMINATIONS_LIVE,
                NOMINATIONS_COMPLETED,
                VOTING_ANNOUNCED,
              ].includes(electionStatus) &&
                electionTimelineDetails?.election_details.voting_start_date &&
                electionTimelineDetails.election_details.voting_end_date && (
                  <>
                    <Text c="dimmed" size="sm" mb="xs">
                      Voting starts from:
                    </Text>
                    <Text c="dimmed" size="sm">
                      Start Date:{" "}
                      <b>
                        {electionTimelineDetails?.election_details
                          .voting_start_date
                          ? formatDate(
                              electionTimelineDetails?.election_details
                                .voting_start_date
                            )
                          : ""}
                      </b>
                    </Text>
                    <Text c="dimmed" size="sm" mt="xs" mb="xs">
                      End Date:{" "}
                      <b>
                        {electionTimelineDetails?.election_details
                          .voting_end_date
                          ? formatDate(
                              electionTimelineDetails?.election_details
                                .voting_end_date
                            )
                          : ""}
                      </b>
                    </Text>
                  </>
                )}
              {(electionStatus === ELECTION_ANNOUNCED ||
                [
                  NOMINATIONS_ANNOUNCED,
                  NOMINATIONS_LIVE,
                  NOMINATIONS_COMPLETED,
                ].includes(electionStatus)) &&
                !electionTimelineDetails?.election_details?.voting_start_date &&
                !electionTimelineDetails?.election_details?.voting_end_date && (
                  <>
                    <Text c="dimmed" size="sm">
                      Voting Process yet to be scheduled
                    </Text>
                  </>
                )}

              {electionStatus === VOTING_LIVE && (
                <>
                  <Text c="dimmed" size="sm">
                    Voting Process is LIVE
                  </Text>
                </>
              )}
              {[VOTING_COMPLETED, CLOSED].includes(electionStatus) && (
                <>
                  <Text c="dimmed" size="sm">
                    Start Date:{" "}
                    <b>
                      {electionTimelineDetails?.election_details
                        .voting_start_date
                        ? formatDate(
                            electionTimelineDetails?.election_details
                              .voting_start_date
                          )
                        : ""}
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
                  <Text c="dimmed" size="sm" mt="xs">
                    Total Votes:{" "}
                    <b>
                      {electionTimelineDetails?.election_count_data.total_votes}
                    </b>
                  </Text>
                </>
              )}
            </Timeline.Item>

            <Timeline.Item
              title="Results"
              bullet={<IconReportAnalytics size={15} />}
            >
              {electionStatus !== VOTING_COMPLETED &&
                electionStatus !== CLOSED && (
                  <>
                    <Text c="dimmed" size="sm">
                      Once above phases are completed results will be published
                    </Text>
                  </>
                )}
              {electionStatus === VOTING_COMPLETED && (
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
            disabled={
              electionStatus === ELECTION_ANNOUNCED ||
              (electionStatus === NOMINATIONS &&
                !isDateValid(
                  electionTimelineDetails?.election_details
                    .nomination_start_date,
                  electionTimelineDetails?.election_details.nomination_end_date
                ))
            }
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
          {electionStatus !== ELECTION_ANNOUNCED && <NominationTab />}
        </Tabs.Panel>

        <Tabs.Panel value={RESULTS}>
          {electionStatus === CLOSED && <Results />}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ElectionDetails;
