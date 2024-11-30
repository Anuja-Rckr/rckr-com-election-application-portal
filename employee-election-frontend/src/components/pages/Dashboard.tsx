import { Button, Group, Paper } from "@mantine/core";
import { useState } from "react";
import NominationForm from "./ElectionForms/NominationForm";
import CreateElectionForm from "./ElectionForms/CreateElection";
import PublishNominationElectionForm from "./ElectionForms/PublishNominationElectionForm";
import { EmpDetailsInterface } from "../../interfaces/common.interface";
import { getUserDetails } from "../../common/utils";

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
  const triggerPublishNominationModal = () => {
    setIsRenderNominationModal(true);
    setIsPublishNominationModal(true);
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

  return (
    <>
      <Paper p="md">
        <Group justify="flex-end">
          {empDetails.isAdmin && (
            <Button onClick={triggerCreateElectionModal}>
              Create Election
            </Button>
          )}
          {empDetails.isAdmin && (
            <Button onClick={triggerPublishNominationModal}>
              Publish Nomination
            </Button>
          )}
          {empDetails.isAdmin && (
            <Button onClick={triggerPublishElectionModal}>
              Publish Voting
            </Button>
          )}
          {!empDetails.isAdmin && (
            <Button onClick={triggerCreateNominationModal}>
              Create Nomination
            </Button>
          )}
          {!empDetails.isAdmin && <Button>Vote</Button>}
        </Group>
      </Paper>
      <NominationForm
        isOpened={isCreateNominationModal}
        onClose={closeCreateNominationModal}
      />
      <CreateElectionForm
        isOpened={isCreateElectionModal}
        onClose={closeCreateElectionModal}
      />
      <PublishNominationElectionForm
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
    </>
  );
};

export default Dashboard;
