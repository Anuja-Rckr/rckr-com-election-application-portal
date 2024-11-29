import { useForm, isNotEmpty } from "@mantine/form";
import { Button, Drawer, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { PublishNominationElectionProps } from "../../../interfaces/election.interface";

const PublishNominationElectionForm = ({
  isOpened,
  onClose,
  renderNominationModal,
}: PublishNominationElectionProps) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      nominationStartDate: null as Date | null,
      nominationEndDate: null as Date | null,
      votingStartDate: null as Date | null,
      votingEndDate: null as Date | null,
      electionId: "1",
      electionTitle: "Emp Performance Award 2024",
    },
    validate: {
      nominationStartDate: isNotEmpty("Nomination start date is required"),
      nominationEndDate: isNotEmpty("Nomination end date is required"),
      votingStartDate: isNotEmpty("Voting start date is required"),
      votingEndDate: isNotEmpty("Voting end date is required"),
    },
  });

  const onCreateElection = (values: typeof form.values) => {
    console.log("Submitted form values:", values);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const renderNominationForm = () => (
    <>
      <DateTimePicker
        label="Nomination Start Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("nominationStartDate")}
      />
      <DateTimePicker
        label="Nomination End Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("nominationEndDate")}
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
      />
      <DateTimePicker
        label="Voting End Date"
        placeholder="Pick a date"
        withAsterisk
        mt="md"
        {...form.getInputProps("votingEndDate")}
      />
    </>
  );

  return (
    <Drawer
      opened={isOpened}
      onClose={handleClose}
      title={
        <Text fw={700} component="h1">
          {renderNominationModal ? "Nomination Dates" : "Voting Dates"}
        </Text>
      }
      position="right"
    >
      <form onSubmit={form.onSubmit(onCreateElection)}>
        <TextInput
          label="Election ID"
          placeholder="Enter election ID"
          withAsterisk
          disabled
          {...form.getInputProps("electionId")}
        />
        <TextInput
          label="Election Title"
          placeholder="Enter election title"
          withAsterisk
          disabled
          mt="md"
          {...form.getInputProps("electionTitle")}
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
