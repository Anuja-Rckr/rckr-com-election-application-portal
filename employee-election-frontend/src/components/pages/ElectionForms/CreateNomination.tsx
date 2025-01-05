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
  fetchUserDetails,
  formatDate,
  generateRandomColor,
  getElectionStatus,
  getInitials,
  isDateValid,
} from "../../../common/utils";
import { NominationFormProps } from "../../../interfaces/election.interface";
import {
  createNomination,
  getEmpNominationStatus,
} from "../../../services/ApiService";
import {
  DATETIME,
  GREEN,
  NOMINATIONS_COMPLETED,
  NOMINATIONS_LIVE,
  RED,
} from "../../../common/constants";
import { IconCircleCheck, IconSquareRoundedX } from "@tabler/icons-react";
import { toast } from "../../../common/toast/ToastService";
import Timer from "../../common/Timer";

const NominationForm = ({
  isOpened,
  onClose,
  electionDetails,
  activeModalType,
}: NominationFormProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [submittedValues, setSubmittedValues] = useState<any>(null);
  const [isEmpNominated, setIsEmpNominated] = useState<boolean>(false);

  const [isNominationDisabled, setIsNominationDisabled] =
    useState<boolean>(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState<boolean>(false);

  const handleTimerExpire = () => {
    setIsNominationDisabled(true);
    setIsTimerCompleted(true);
  };

  const fetchNominationStatus = async () => {
    if (electionDetails?.election_id) {
      const response = await getEmpNominationStatus(
        electionDetails?.election_id
      );
      setIsEmpNominated(response.is_emp_nominated);
      setIsNominationDisabled(response.is_emp_nominated);
    }
  };

  useEffect(() => {
    const fetchNominationData = async () => {
      await fetchNominationStatus();
    };

    if (isOpened && activeModalType === "nomination") {
      fetchNominationData();
    }
  }, [isOpened, electionDetails?.election_id, activeModalType]);

  const userDetails = fetchUserDetails();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      rckrEmpId: "",
      userName: userDetails.user_name,
      appeal: "",
    },
    validate: {
      rckrEmpId: isNotEmpty("Emp ID is required"),
      userName: isNotEmpty("Emp name is required"),
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
      const requestBody = {
        rckr_emp_id: submittedValues.rckrEmpId,
        appeal: submittedValues.appeal,
      };
      if (electionDetails?.election_id) {
        createNomination(requestBody, electionDetails?.election_id);
        setIsNominationDisabled(true);
        toast.success("Nomination created successfully");
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
        {isDateValid(
          electionDetails?.nomination_start_date,
          electionDetails?.nomination_end_date
        ) &&
          electionDetails?.nomination_end_date && (
            <Timer
              isValidDate={isDateValid(
                electionDetails.nomination_start_date,
                electionDetails.nomination_end_date
              )}
              type="nomination"
              endTime={electionDetails.nomination_end_date}
              onExpire={handleTimerExpire}
            />
          )}
        {!isDateValid(
          electionDetails?.nomination_start_date,
          electionDetails?.nomination_end_date
        ) &&
          electionDetails?.nomination_start_date && (
            <Timer
              isValidDate={isDateValid(
                electionDetails.nomination_start_date,
                electionDetails.nomination_end_date
              )}
              type="nomination"
              endTime={electionDetails.nomination_start_date}
              onExpire={handleTimerExpire}
            />
          )}
        {isNominationDisabled && !isTimerCompleted && (
          <Alert
            variant="light"
            color={GREEN}
            title={`You have already nominated on ${
              isEmpNominated
                ? formatDate(
                    electionDetails?.created_at || new Date().toISOString(),
                    DATETIME
                  )
                : formatDate(new Date().toISOString(), DATETIME)
            }`}
            icon={<IconCircleCheck size={50} />}
          />
        )}
        {isNominationDisabled && isTimerCompleted && (
          <Alert
            variant="light"
            color={RED}
            title="The Nominations are closed"
            mb="md"
            icon={<IconSquareRoundedX size={50} />}
          ></Alert>
        )}
        <form onSubmit={form.onSubmit(onCreateNomination)}>
          <Group justify="center">
            <Avatar
              color={generateRandomColor(userDetails.user_name)}
              radius="xl"
              size="lg"
            >
              {getInitials(userDetails.user_name)}
            </Avatar>
          </Group>
          <TextInput
            label="RCKR employee ID"
            placeholder="Enter RCKR employee ID"
            withAsterisk
            disabled={
              (isNominationDisabled &&
                getElectionStatus(electionDetails) === NOMINATIONS_LIVE) ||
              getElectionStatus(electionDetails) === NOMINATIONS_COMPLETED
            }
            key={form.key("rckrEmpId")}
            {...form.getInputProps("rckrEmpId")}
          />
          <TextInput
            label="Enter Name"
            placeholder="Enter Emp name"
            withAsterisk
            mt="md"
            disabled
            key={form.key("userName")}
            {...form.getInputProps("userName")}
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
              (isNominationDisabled &&
                getElectionStatus(electionDetails) === NOMINATIONS_LIVE) ||
              getElectionStatus(electionDetails) === NOMINATIONS_COMPLETED
            }
            {...form.getInputProps("appeal")}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            disabled={
              (isNominationDisabled &&
                getElectionStatus(electionDetails) === NOMINATIONS_LIVE) ||
              getElectionStatus(electionDetails) === NOMINATIONS_COMPLETED
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
          <Text>
            You have nominated yourself for election{"  "}
            <span className="highlight_name">
              <b>{electionDetails?.election_title}</b>
            </span>
          </Text>

          <Text size="sm" mt="sm">
            Do you want to proceed?
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
