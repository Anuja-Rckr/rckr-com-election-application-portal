import React, { useEffect, useState } from "react";
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
  Alert,
} from "@mantine/core";
import {
  generateRandomColor,
  getInitials,
  getUserDetails,
  isDateValid,
} from "../../../common/utils";
import { NominationFormProps } from "../../../interfaces/election.interface";
import {
  createNomination,
  getEmpNominationStatus,
} from "../../../services/ApiService";
import { GREEN, RED } from "../../../common/constants";
import { IconCircleCheck, IconSquareRoundedX } from "@tabler/icons-react";

const NominationForm = ({
  isOpened,
  onClose,
  electionDetails,
}: NominationFormProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [submittedValues, setSubmittedValues] = useState<any>(null);
  const [isEmpNominated, setIsEmpNominated] = useState<boolean>(false);

  const fetchNominationStatus = async () => {
    if (electionDetails?.election_id) {
      const response = await getEmpNominationStatus(
        empDetails.emp_id,
        electionDetails?.election_id
      );
      setIsEmpNominated(response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchNominationStatus();
    };

    fetchData();
  }, []);

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
    console.log("ddd reached");
    if (submittedValues) {
      setIsConfirmModalOpen(false);
      const requestBody = {
        emp_id: submittedValues.empId,
        emp_name: submittedValues.empName,
        emp_role: submittedValues.empRole,
        appeal: submittedValues.appeal,
      };
      if (electionDetails?.election_id) {
        const response = createNomination(
          requestBody,
          electionDetails?.election_id
        );
      }
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
        {isEmpNominated &&
          isDateValid(
            electionDetails?.nomination_start_date,
            electionDetails?.nomination_end_date
          ) && (
            <Alert
              mb="md"
              variant="light"
              color={GREEN}
              title="You have already nominated"
              icon={<IconCircleCheck size={50} />}
            ></Alert>
          )}
        {!isEmpNominated &&
          isDateValid(
            electionDetails?.nomination_start_date,
            electionDetails?.nomination_end_date
          ) && (
            <Alert
              mb="md"
              variant="light"
              color={RED}
              title="The Nominations are closed"
              icon={<IconSquareRoundedX size={50} />}
            ></Alert>
          )}
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
            disabled={
              (isEmpNominated &&
                isDateValid(
                  electionDetails?.nomination_start_date,
                  electionDetails?.nomination_end_date
                )) ||
              (!isEmpNominated &&
                isDateValid(
                  electionDetails?.nomination_start_date,
                  electionDetails?.nomination_end_date
                ))
            }
            {...form.getInputProps("appeal")}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            disabled={
              (isEmpNominated &&
                isDateValid(
                  electionDetails?.nomination_start_date,
                  electionDetails?.nomination_end_date
                )) ||
              (!isEmpNominated &&
                isDateValid(
                  electionDetails?.nomination_start_date,
                  electionDetails?.nomination_end_date
                ))
            }
          >
            Submit
          </Button>
        </form>
        <Modal
          opened={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Submission"
        >
          <div>Are you sure you want to create this nomination?</div>

          <Text color={RED} size="sm" mt="sm">
            Once the nomination is submitted, it cannot be changed or withdrawn.
          </Text>

          <Group mt="md">
            <Button variant="default" onClick={handleConfirm}>
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
