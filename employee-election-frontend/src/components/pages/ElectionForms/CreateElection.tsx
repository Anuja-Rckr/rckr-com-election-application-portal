import { useForm, isNotEmpty } from "@mantine/form";
import {
  Button,
  TextInput,
  Drawer,
  Textarea,
  Text,
  NumberInput,
} from "@mantine/core";
import {
  createElectionInterface,
  NominationFormProps,
} from "../../../interfaces/election.interface";
import { EmpDetailsInterface } from "../../../interfaces/common.interface";
import { fetchUserDetails } from "../../../common/utils";
import { createElection } from "../../../services/ApiService";
import { toast } from "../../../common/toast/ToastService";

const CreateElectionForm = ({ isOpened, onClose }: NominationFormProps) => {
  const userDetails: EmpDetailsInterface = fetchUserDetails();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      electionTitle: "",
      electionDescription: "",
      electionReward: "",
      electionNominationEligibility: "",
      electionVotingEligibility: "",
      electionTotalVotes: "",
    },
    validate: {
      electionTitle: isNotEmpty("Election title is required"),
      electionDescription: isNotEmpty("Election description is required"),
      electionTotalVotes: isNotEmpty("Election total votes"),
    },
  });

  const onCreateElection = (values: typeof form.values) => {
    const electionDetails: createElectionInterface = {
      election_title: values.electionTitle,
      election_description: values.electionDescription,
      election_reward: values.electionReward,
      election_eligibility: {
        nomination_eligibility: values.electionNominationEligibility,
        voting_eligibility: values.electionVotingEligibility,
      },
      created_by_name: userDetails.user_name,
      election_total_votes: values.electionTotalVotes,
    };
    createElection(electionDetails);
    toast.success("Election created successfully");
    handleClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Drawer
      opened={isOpened}
      onClose={handleClose}
      title={<Text fw={700}>Create Election</Text>}
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
        <NumberInput
          label="Election Total votes"
          placeholder="Enter total votes"
          mt="md"
          {...form.getInputProps("electionTotalVotes")}
        />
        <TextInput
          label="Reward"
          placeholder="Enter election reward"
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
