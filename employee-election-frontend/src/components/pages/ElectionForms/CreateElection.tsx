import { useForm, isNotEmpty } from "@mantine/form";
import { Button, TextInput, Drawer, Textarea, Text } from "@mantine/core";
import { NominationFormProps } from "../../../interfaces/election.interface";

const CreateElectionForm = ({ isOpened, onClose }: NominationFormProps) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      electionTitle: "",
      electionDescription: "",
      electionCutoff: "",
      electionReward: "",
      electionNominationEligibility: "",
      electionVotingEligibility: "",
    },
    validate: {
      electionTitle: isNotEmpty("Election title is required"),
      electionDescription: isNotEmpty("Election description is required"),
      electionCutoff: isNotEmpty("Cutoff is required"),
      electionReward: isNotEmpty("Reward is required"),
    },
  });

  const onCreateElection = (values: typeof form.values) => {
    console.log("Submitted form values:", values);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Drawer
      opened={isOpened}
      onClose={handleClose}
      title={
        <Text fw={700} component="h1">
          Create Election
        </Text>
      }
      position="right"
    >
      <form onSubmit={form.onSubmit(onCreateElection)}>
        <TextInput
          label="Election Title"
          placeholder="Enter election title"
          withAsterisk
          {...form.getInputProps("electionTitle")}
        />
        <Textarea
          label="Election Description"
          placeholder="Enter election description"
          withAsterisk
          autosize
          minRows={3}
          mt="md"
          {...form.getInputProps("electionDescription")}
        />
        <TextInput
          label="Cutoff"
          placeholder="Enter election cutoff date (YYYY-MM-DD)"
          withAsterisk
          mt="md"
          {...form.getInputProps("electionCutoff")}
        />
        <TextInput
          label="Reward"
          placeholder="Enter election reward details"
          withAsterisk
          mt="md"
          {...form.getInputProps("electionReward")}
        />
        <Textarea
          label="Nomination Eligibility Criteria"
          placeholder="Enter nomination eligibility criteria"
          autosize
          minRows={3}
          mt="md"
          {...form.getInputProps("electionNominationEligibility")}
        />
        <Textarea
          label="Voting Eligibility Criteria"
          placeholder="Enter voting eligibility criteria"
          autosize
          minRows={3}
          mt="md"
          {...form.getInputProps("electionVotingEligibility")}
        />
        <Button fullWidth mt="xl" type="submit">
          Submit
        </Button>
      </form>
    </Drawer>
  );
};

export default CreateElectionForm;
