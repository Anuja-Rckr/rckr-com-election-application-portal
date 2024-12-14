import { Badge, Button, Group, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import NominationForm from "./ElectionForms/CreateNomination";
import CreateElectionForm from "./ElectionForms/CreateElection";
import PublishNominationElectionForm from "./ElectionForms/PublishNominationElectionForm";
import { EmpDetailsInterface } from "../../interfaces/common.interface";
import {
  getColorForStatus,
  getElectionStatus,
  getUserDetails,
} from "../../common/utils";
import { getDashboardElectionList } from "../../services/ApiService";
import {
  ELECTION_ANNOUNCED,
  NOMINATIONS_ANNOUNCED,
  NOMINATIONS_COMPLETED,
  NOMINATIONS_LIVE,
  VOTING_COMPLETED,
  VOTING_LIVE,
} from "../../common/constants";
import { DashboardElectionDetails } from "../../interfaces/election.interface";
import Voting from "./ElectionForms/Voting";

const Dashboard: React.FC = () => {
  const empDetails: EmpDetailsInterface = getUserDetails();
  const [activeModalType, setActiveModalType] = useState<string>("");

  // Create Election
  const [isCreateElectionModal, setIsCreateElectionModal] =
    useState<boolean>(false);
  // Publish Nomination and Publish Voting
  const [isRenderNominationModal, setIsRenderNominationModal] =
    useState<boolean>(false);
  const [isPublishNominationModal, setIsPublishNominationModal] =
    useState<boolean>(false);
  const [isPublishVotingModal, setIsPublishVotingModal] =
    useState<boolean>(false);

  // Create Nomination
  const [isCreateNominationModal, setIsCreateNominationModal] =
    useState<boolean>(false);

  // Vote Modal
  const [isVotingModal, setIsVotingModal] = useState<boolean>(false);

  const [currentElectionDetails, setCurrentElectionDetails] =
    useState<DashboardElectionDetails | null>(null);

  const [dashboardElectionList, setDashboardElectionList] = useState<
    DashboardElectionDetails[]
  >([]);

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
    setIsRenderNominationModal(false);
  };

  // Handlers for Publish Voting Modal
  const triggerPublishVotingModal = (election: DashboardElectionDetails) => {
    setCurrentElectionDetails(election);
    setIsRenderNominationModal(false);
    setIsPublishVotingModal(true);
  };

  const closePublishVotingModal = () => {
    setIsPublishVotingModal(false);
    setIsRenderNominationModal(false);
  };

  // Handlers for Create Nomination Modal
  const triggerCreateNominationModal = (election: DashboardElectionDetails) => {
    setCurrentElectionDetails(election);
    setIsCreateNominationModal(true);
    setActiveModalType("nomination");
  };

  const closeCreateNominationModal = () => {
    setIsCreateNominationModal(false);
    setActiveModalType("");
  };

  // Handlers for Voting Modal
  const triggerVotingModal = async (election: DashboardElectionDetails) => {
    setCurrentElectionDetails(election);
    setIsVotingModal(true);
    setActiveModalType("voting");
  };

  const closeVotingModal = () => {
    setIsVotingModal(false);
    setActiveModalType("");
  };

  const fetchDashboardElectionList = async () => {
    const response = await getDashboardElectionList();
    setDashboardElectionList(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardElectionList();
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [isCreateElectionModal, isPublishNominationModal, isPublishVotingModal]);

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
      {dashboardElectionList.length > 0 && (
        <Paper p="md">
          {dashboardElectionList.map(
            (election: DashboardElectionDetails, index: number) => (
              <Group justify="space-between" mt="md" key={index}>
                <Text>Title: {election.election_title}</Text>
                {"    "}
                <Text>
                  Status:{" "}
                  <Badge color={getColorForStatus(getElectionStatus(election))}>
                    {getElectionStatus(election)}
                  </Badge>
                </Text>
                <Group>
                  {empDetails.isAdmin && (
                    <Button
                      onClick={() => triggerPublishNominationModal(election)}
                      disabled={
                        getElectionStatus(election) !== ELECTION_ANNOUNCED
                      }
                    >
                      Publish Nomination
                    </Button>
                  )}
                  {empDetails.isAdmin && (
                    <Button
                      onClick={() => triggerPublishVotingModal(election)}
                      disabled={
                        ![
                          NOMINATIONS_ANNOUNCED,
                          NOMINATIONS_LIVE,
                          NOMINATIONS_COMPLETED,
                        ].includes(getElectionStatus(election))
                      }
                    >
                      Publish Voting
                    </Button>
                  )}
                  {empDetails.isAdmin && (
                    <Button
                      disabled={
                        getElectionStatus(election) !== VOTING_COMPLETED
                      }
                    >
                      Publish Result
                    </Button>
                  )}
                  {!empDetails.isAdmin && (
                    <Button
                      onClick={() => triggerCreateNominationModal(election)}
                      disabled={
                        getElectionStatus(election) !== NOMINATIONS_LIVE
                      }
                    >
                      Create Nomination
                    </Button>
                  )}

                  {!empDetails.isAdmin && (
                    <Button
                      disabled={getElectionStatus(election) !== VOTING_LIVE}
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
      )}
      <CreateElectionForm
        isOpened={isCreateElectionModal}
        onClose={closeCreateElectionModal}
      />
      <PublishNominationElectionForm
        electionDetails={currentElectionDetails}
        isOpened={
          isRenderNominationModal
            ? isPublishNominationModal
            : isPublishVotingModal
        }
        onClose={
          isRenderNominationModal
            ? closePublishNominationModal
            : closePublishVotingModal
        }
        renderNominationModal={isRenderNominationModal}
      />
      <NominationForm
        electionDetails={currentElectionDetails}
        isOpened={isCreateNominationModal}
        onClose={closeCreateNominationModal}
        activeModalType={activeModalType}
      />
      <Voting
        electionDetails={currentElectionDetails}
        isOpened={isVotingModal}
        onClose={closeVotingModal}
        activeModalType={activeModalType}
      />
    </>
  );
};

export default Dashboard;
