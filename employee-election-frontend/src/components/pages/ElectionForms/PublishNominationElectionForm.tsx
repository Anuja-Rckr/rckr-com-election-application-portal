import { useForm, isNotEmpty } from "@mantine/form";
import { Button, Drawer, Text, TextInput } from "@mantine/core";
import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import { PublishNominationElectionProps } from "../../../interfaces/election.interface";
import { updateElectionDetails } from "../../../services/ApiService";
import { LIVE, NOMINATIONS } from "../../../common/constants";

const PublishNominationElectionForm = ({
  isOpened,
  onClose,
  renderNominationModal,
  electionDetails,
}: PublishNominationElectionProps) => {
  const nominationValidField = {
    nominationStartDate: isNotEmpty("Nomination start date is required"),
    nominationEndDate: (value: Date | null, values: any) =>
      !value
        ? "Nomination end date is required"
        : values.nominationStartDate && value <= values.nominationStartDate
        ? "Nomination end date must be after the start date"
        : null,
  };

  const votingValidField = {
    votingStartDate: isNotEmpty("Voting start date is required"),
    votingEndDate: (value: Date | null, values: any) =>
      !value
        ? "Voting end date is required"
        : values.votingStartDate && value <= values.votingStartDate
        ? "Voting end date must be after the start date"
        : null,
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nominationStartDate: null as Date | null,
      nominationEndDate: null as Date | null,
      votingStartDate: null as Date | null,
      votingEndDate: null as Date | null,
    },
    validate: renderNominationModal ? nominationValidField : votingValidField,
  });

  const onUpdateElection = (values: typeof form.values) => {
    let requestBody;
    if (renderNominationModal) {
      requestBody = {
        nomination_start_date: values.nominationStartDate,
        nomination_end_date: values.nominationEndDate,
        election_status: NOMINATIONS,
      };
      if (electionDetails?.election_id) {
        updateElectionDetails(requestBody, electionDetails?.election_id);
      }
    } else {
      requestBody = {
        voting_start_date: values.votingStartDate,
        voting_end_date: values.votingEndDate,
        election_status: LIVE,
      };
      if (electionDetails?.election_id) {
        updateElectionDetails(requestBody, electionDetails?.election_id);
      }
    }
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const renderNominationForm = () => (
    <>
      <DatePickerInput
        label="Nomination Start Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("nominationStartDate")}
        minDate={new Date()}
      />
      <DatePickerInput
        label="Nomination End Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("nominationEndDate")}
        minDate={new Date()}
      />
    </>
  );

  const renderVotingForm = () => (
    <>
      <DateTimePicker
        label="Voting Start Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("votingStartDate")}
        minDate={new Date()}
      />
      <DateTimePicker
        label="Voting End Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("votingEndDate")}
        minDate={new Date()}
      />
    </>
  );

  return (
    <Drawer
      opened={isOpened}
      onClose={handleClose}
      title={
        <Text fw={700}>
          {renderNominationModal ? "Nomination Dates" : "Voting Dates"}
        </Text>
      }
      position="right"
    >
      <form onSubmit={form.onSubmit(onUpdateElection)}>
        <TextInput
          label="Election Title"
          placeholder="Enter election title"
          withAsterisk
          disabled
          value={electionDetails?.election_title}
        />
        {renderNominationModal ? renderNominationForm() : renderVotingForm()}
        <Button fullWidth mt="xl" type="submit">
          Submit
        </Button>
      </form>
    </Drawer>
  );
};

export default PublishNominationElectionForm;
