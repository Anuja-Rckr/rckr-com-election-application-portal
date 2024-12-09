import { Badge, Button, Group, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import NominationForm from "./ElectionForms/CreateNomination";
import CreateElectionForm from "./ElectionForms/CreateElection";
import PublishNominationElectionForm from "./ElectionForms/PublishNominationElectionForm";
import { EmpDetailsInterface } from "../../interfaces/common.interface";
import {
  getColorForStatus,
  getUserDetails,
  isDateValid,
} from "../../common/utils";
import { getDashboardElectionList } from "../../services/ApiService";
import { COMPLETED, DECLARED, LIVE, NOMINATIONS } from "../../common/constants";
import {
  DashboardElectionDetails,
  VotingList,
} from "../../interfaces/election.interface";
import Voting from "./ElectionForms/Voting";

const Dashboard: React.FC = () => {
  const empDetails: EmpDetailsInterface = getUserDetails();
  const [isCreateNominationModal, setIsCreateNominationModal] =
    useState<boolean>(false);
  const [isCreateElectionModal, setIsCreateElectionModal] =
    useState<boolean>(false);
  const [isPublishNominationModal, setIsPublishNominationModal] =
    useState<boolean>(false);
  const [isPublishElectionModal, setIsPublishElectionModal] =
    useState<boolean>(false);
  const [isRenderNominationModal, setIsRenderNominationModal] =
    useState<boolean>(false);
  const [isVotingModal, setIsVotingModal] = useState<boolean>(false);

  const [currentElectionDetails, setCurrentElectionDetails] =
    useState<DashboardElectionDetails | null>(null);

  const [dashboardElectionList, setDashboardElectionList] = useState<
    DashboardElectionDetails[]
  >([]);

  // Handlers for Create Nomination Modal
  const triggerCreateNominationModal = () => {
    setIsCreateNominationModal(true);
  };

  const closeCreateNominationModal = () => {
    setIsCreateNominationModal(false);
  };

  // Handlers for Create Election Modal
  const triggerCreateElectionModal = () => {
    setIsCreateElectionModal(true);
  };

  const closeCreateElectionModal = () => {
    setIsCreateElectionModal(false);
  };

  // Handlers for Publish Nomination Modal
  const triggerPublishNominationModal = (
    election: DashboardElectionDetails
  ) => {
    setIsRenderNominationModal(true);
    setIsPublishNominationModal(true);
    setCurrentElectionDetails(election);
  };

  const closePublishNominationModal = () => {
    setIsPublishNominationModal(false);
  };

  // Handlers for Publish Election Modal
  const triggerPublishElectionModal = () => {
    setIsRenderNominationModal(false);
    setIsPublishElectionModal(true);
  };

  const closePublishElectionModal = () => {
    setIsPublishElectionModal(false);
  };

  const triggerVotingModal = async (election: DashboardElectionDetails) => {
    setCurrentElectionDetails(election);
    setIsVotingModal(true);
  };

  const fetchDashboardElectionList = async () => {
    const response = await getDashboardElectionList();
    setDashboardElectionList(response);
  };

  const closeVotingModal = () => {
    setIsVotingModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardElectionList();
    };

    fetchData();
  }, []);

  return (
    <>
      {empDetails.isAdmin && (
        <Paper p="md" mb="md">
          <Group justify="flex-end">
            {empDetails.isAdmin && (
              <Button onClick={triggerCreateElectionModal}>
                Create Election
              </Button>
            )}
          </Group>
        </Paper>
      )}
      <Paper p="md">
        {dashboardElectionList.map(
          (election: DashboardElectionDetails, index: number) => (
            <Group justify="space-between" mt="md" key={index}>
              <Text>Title: {election.election_title}</Text>
              {"    "}
              <Text>
                Status:{" "}
                <Badge color={getColorForStatus(election.election_status)}>
                  {election.election_status}
                </Badge>
              </Text>
              <Group>
                {empDetails.isAdmin && (
                  <Button
                    onClick={() => triggerPublishNominationModal(election)}
                    disabled={election.election_status !== DECLARED}
                  >
                    Publish Nomination
                  </Button>
                )}
                {empDetails.isAdmin && (
                  <Button
                    onClick={triggerPublishElectionModal}
                    disabled={election.election_status !== NOMINATIONS}
                  >
                    Publish Voting
                  </Button>
                )}
                {empDetails.isAdmin && (
                  <Button disabled={election.election_status !== COMPLETED}>
                    Publish Result
                  </Button>
                )}
                {!empDetails.isAdmin && (
                  <Button
                    onClick={triggerCreateNominationModal}
                    disabled={
                      election.election_status !== NOMINATIONS ||
                      isDateValid(election.nomination_end_date)
                    }
                  >
                    Create Nomination
                  </Button>
                )}

                {!empDetails.isAdmin && (
                  <Button
                    disabled={
                      election.election_status !== LIVE ||
                      isDateValid(election.voting_end_date)
                    }
                    onClick={() => triggerVotingModal(election)}
                  >
                    Vote
                  </Button>
                )}
              </Group>
            </Group>
          )
        )}
      </Paper>
      <NominationForm
        electionDetails={currentElectionDetails}
        isOpened={isCreateNominationModal}
        onClose={closeCreateNominationModal}
      />
      <CreateElectionForm
        isOpened={isCreateElectionModal}
        onClose={closeCreateElectionModal}
      />
      <PublishNominationElectionForm
        electionDetails={currentElectionDetails}
        isOpened={
          isRenderNominationModal
            ? isPublishNominationModal
            : isPublishElectionModal
        }
        onClose={
          isRenderNominationModal
            ? closePublishNominationModal
            : closePublishElectionModal
        }
        renderNominationModal={isRenderNominationModal}
      />
      <Voting
        electionDetails={currentElectionDetails}
        isOpened={isVotingModal}
        onClose={closeVotingModal}
      />
    </>
  );
};

export default Dashboard;
