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
} from "../../common/constants";
import {
  formatDate,
  getActiveNumber,
  getColorForStatus,
} from "../../common/utils";
import {
  ElectionDetailsInterface,
  overviewData,
} from "../../interfaces/election.interface";

const ElectionDetails = () => {
  const electionStatus: string = "Live";
  const stackData: overviewData[] = [
    { title: "Title", value: "Best Performance 2023", type: "data" },
    { title: "Created By", value: "Anuja Aliveli", type: "data" },
    {
      title: "Created At",
      value: "2024-10-31T17:00:00Z",
      type: "datetime",
    },
    { title: "Cutoff", value: "50 votes", type: "data" },
    { title: "Reward", value: "Rs.1000", type: "data" },
    {
      title: "Election Status",
      value: "Declared",
      type: "status",
    },
  ];
  const renderOverview = () => {
    return (
      <>
        <Paper mb="xl">
          <Paper className="bg-overview" p="sm">
            <Group justify="space-around">
              {stackData.map((item, index) =>
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
                    <Text className="text-center">{item.value}</Text>
                  </Stack>
                ) : item.type === STATUS ? (
                  <Stack
                    gap={0}
                    className={stackData.length === index ? "border-right" : ""}
                    pr="sm"
                    key={index}
                  >
                    <Text fw={700} className="text-center">
                      {item.title}
                    </Text>
                    <Badge color={getColorForStatus(item.value)}>
                      Declared
                    </Badge>
                  </Stack>
                ) : null
              )}
            </Group>
          </Paper>
        </Paper>
      </>
    );
  };

  const timeLineData: ElectionDetailsInterface = {
    nomination_details: {
      title: "Nomination Phase",
      start_date: "2024-10-31T17:00:00Z",
      end_date: "2024-10-31T17:00:00Z",
      total_nominations: 10,
    },
    voting_details: {
      title: "Voting Phase",
      start_date: "2024-10-31T17:00:00Z",
      end_date: "2024-10-31T17:00:00Z",
      total_votes: 50,
    },
    results_details: {
      title: "Results",
      published_on: "2024-10-31T17:00:00Z",
    },
  };

  const renderTimeline = () => {
    return (
      <>
        <Timeline
          active={getActiveNumber(electionStatus)}
          bulletSize={24}
          lineWidth={2}
        >
          <Timeline.Item
            bullet={<IconUsers size={15} />}
            title={timeLineData.nomination_details.title}
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
                    {formatDate(timeLineData.nomination_details.start_date)}
                  </b>
                </Text>
                <Text c="dimmed" size="sm" mt="xs" mb="xs">
                  End Date:{" "}
                  <b>{formatDate(timeLineData.nomination_details.end_date)}</b>
                </Text>
                <Text c="dimmed" size="sm">
                  Total Nominations:{" "}
                  <b>
                    {timeLineData.nomination_details.total_nominations}{" "}
                    Nominations
                  </b>
                </Text>
              </>
            )}
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconThumbUp size={15} />}
            title={timeLineData.voting_details.title}
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
                  <b>{formatDate(timeLineData.voting_details.start_date)}</b>
                </Text>
                <Text c="dimmed" size="sm" mt="xs" mb="xs">
                  End Date:{" "}
                  <b>{formatDate(timeLineData.voting_details.end_date)}</b>
                </Text>
                <Text c="dimmed" size="sm">
                  Total Votes:{" "}
                  <b>{timeLineData.voting_details.total_votes} Votes</b>
                </Text>
              </>
            )}
          </Timeline.Item>

          <Timeline.Item
            title={timeLineData.results_details.title}
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
                  <b>{formatDate(timeLineData.results_details.published_on)}</b>
                </Text>
              </>
            )}
          </Timeline.Item>
        </Timeline>
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
            <Tabs.Tab value={RESULTS} leftSection={<IconReportAnalytics />}>
              Results
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={OVERVIEW} p="md">
            {renderOverview()}
            {renderTimeline()}
          </Tabs.Panel>

          <Tabs.Panel value={NOMINATIONS}>Nominations tab content</Tabs.Panel>

          <Tabs.Panel value={RESULTS}>Results tab content</Tabs.Panel>
        </Tabs>
      </Paper>
    </>
  );
};

export default ElectionDetails;
