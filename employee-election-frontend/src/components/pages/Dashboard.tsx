import { Button, Group, Paper } from "@mantine/core";
import { useState } from "react";
import NominationForm from "./ElectionForms/NominationForm";
import CreateElectionForm from "./ElectionForms/CreateElection";

const Dashboard = () => {
  const [isCreateNominationModal, setIsCreateNominationModal] = useState(false);
  const [isCreateElectionModal, setIsCreateElectionModal] = useState(false);

  const triggerCreateNominationModal = () => {
    setIsCreateNominationModal(true);
  };

  const closeCreateNominationModal = () => {
    setIsCreateNominationModal(false);
  };

  const triggerCreateElectionModal = () => {
    setIsCreateElectionModal(true);
  };

  const closeCreateElectionModal = () => {
    setIsCreateElectionModal(false);
  };

  return (
    <>
      <Paper p="md">
        <Group justify="flex-end">
          <Button onClick={triggerCreateElectionModal}>Create Election</Button>
          <Button>Publish Nomination</Button>
          <Button>Publish Voting</Button>
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
    </>
  );
};

export default Dashboard;
