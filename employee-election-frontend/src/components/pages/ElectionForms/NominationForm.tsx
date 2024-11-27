import { useForm, isNotEmpty } from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  Drawer,
  Avatar,
  Textarea,
  Modal,
  Text,
} from "@mantine/core";
import { NominationFormProps } from "../../../interfaces/election.interface";
import { generateRandomColor, getInitials } from "../../../common/utils";
import { useState } from "react";

const NominationForm = ({ isOpened, onClose }: NominationFormProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      empId: "102",
      empName: "Anuja",
      empRole: "",
      appeal: "",
    },
    validate: {
      empId: isNotEmpty("Emp ID is required"),
      empName: isNotEmpty("Emp name is required"),
      empRole: isNotEmpty("Emp role is required"),
      appeal: isNotEmpty("Appeal is required"),
    },
  });

  const onCreateNomination = (values: typeof form.values) => {
    setIsConfirmModalOpen(true);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleConfirm = () => {
    setIsConfirmModalOpen(false);
    onClose();
  };

  return (
    <>
      <Drawer
        opened={isOpened}
        onClose={handleClose}
        title="Create Nomination"
        position="right"
      >
        <form onSubmit={form.onSubmit(onCreateNomination)}>
          <Group justify="center">
            <Avatar color={generateRandomColor("Anuja")} radius="xl" size="lg">
              {getInitials("Anuja")}
            </Avatar>
          </Group>
          <TextInput
            label="Emp ID"
            placeholder="Enter Emp ID"
            withAsterisk
            disabled
            key={form.key("empId")}
            {...form.getInputProps("empId")}
          />
          <TextInput
            label="Enter Name"
            placeholder="Enter Emp name"
            withAsterisk
            mt="md"
            disabled
            key={form.key("empName")}
            {...form.getInputProps("empName")}
          />
          <TextInput
            label="Emp Role"
            placeholder="Enter Emp role"
            withAsterisk
            mt="md"
            key={form.key("empRole")}
            {...form.getInputProps("empRole")}
          />
          <Textarea
            label="Appeal"
            placeholder="Enter your appeal"
            withAsterisk
            autosize
            minRows={5}
            maxRows={8}
            mt="md"
            key={form.key("appeal")}
            {...form.getInputProps("appeal")}
          />
          <Button fullWidth mt="xl" type="submit">
            Submit
          </Button>
        </form>
        <Modal
          opened={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Submission"
        >
          <div>Are you sure you want to create this nomination?</div>

          <Text color="red" size="sm" mt="sm">
            Once the nomination is submitted, it cannot be changed or withdrawn.
          </Text>

          <Group mt="md">
            <Button
              variant="default"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </Group>
        </Modal>
      </Drawer>
    </>
  );
};

export default NominationForm;
