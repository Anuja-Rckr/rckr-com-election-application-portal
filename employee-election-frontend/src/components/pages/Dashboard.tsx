import { Button, Group, Paper } from "@mantine/core";
import { useState } from "react";
import NominationForm from "./ElectionForms/NominationForm";

const Dashboard = () => {
  const [opened, setOpen] = useState(false);

  const triggerModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper p="md">
        <Group justify="flex-end">
          <Button>Create Election</Button>
          <Button>Publish Nomination</Button>
          <Button>Publish Voting</Button>
          <Button onClick={triggerModal}>Create Nomination</Button>
          <Button>Vote</Button>
        </Group>
      </Paper>
      <NominationForm isOpened={opened} onClose={closeModal} />
    </>
  );
};

export default Dashboard;
