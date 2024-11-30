import React, { useState } from "react";
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
import {
  generateRandomColor,
  getInitials,
  getUserDetails,
} from "../../../common/utils";
import { NominationFormProps } from "../../../interfaces/election.interface";
import { createNomination } from "../../../services/ApiService";

const NominationForm = ({ isOpened, onClose }: NominationFormProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [submittedValues, setSubmittedValues] = useState<any>(null);

  const empDetails = getUserDetails();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      empId: empDetails.empId,
      empName: empDetails.empName,
      empRole: empDetails.empRole,
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
    setSubmittedValues(values);
    setIsConfirmModalOpen(true);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (submittedValues) {
      setIsConfirmModalOpen(false);
      onClose();
      const requestBody = {
        emp_id: submittedValues.empId,
        emp_name: submittedValues.empName,
        emp_role: submittedValues.empRole,
        appeal: submittedValues.appeal,
      };
      const response = createNomination(requestBody, 8);
      handleClose();
    }
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
            <Avatar
              color={generateRandomColor(empDetails.empName)}
              radius="xl"
              size="lg"
            >
              {getInitials(empDetails.empName)}
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
            disabled
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
