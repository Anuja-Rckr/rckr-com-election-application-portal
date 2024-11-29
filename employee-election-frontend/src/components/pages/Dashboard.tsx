import { Button, Group, Paper } from "@mantine/core";
import { useState } from "react";
import NominationForm from "./ElectionForms/NominationForm";
import CreateElectionForm from "./ElectionForms/CreateElection";
import PublishNominationElectionForm from "./ElectionForms/PublishNominationElectionForm";

const Dashboard: React.FC = () => {
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
          <Button onClick={triggerCreateElectionModal}>Create Election</Button>
          <Button onClick={triggerPublishNominationModal}>
            Publish Nomination
          </Button>
          <Button onClick={triggerPublishElectionModal}>Publish Voting</Button>
          <Button onClick={triggerCreateNominationModal}>
            Create Nomination
          </Button>
          <Button>Vote</Button>
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
