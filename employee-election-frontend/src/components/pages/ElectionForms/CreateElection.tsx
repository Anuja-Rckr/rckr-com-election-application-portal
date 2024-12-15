import { useForm, isNotEmpty } from "@mantine/form";
import { Button, TextInput, Drawer, Textarea, Text } from "@mantine/core";
import {
  createElectionInterface,
  NominationFormProps,
} from "../../../interfaces/election.interface";
import { EmpDetailsInterface } from "../../../interfaces/common.interface";
import { getUserDetails } from "../../../common/utils";
import { createElection } from "../../../services/ApiService";
import { toast } from "../../../common/toast/ToastService";

const CreateElectionForm = ({ isOpened, onClose }: NominationFormProps) => {
  const empDetails: EmpDetailsInterface = getUserDetails();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      electionTitle: "",
      electionDescription: "",
      electionReward: "",
      electionNominationEligibility: "",
      electionVotingEligibility: "",
    },
    validate: {
      electionTitle: isNotEmpty("Election title is required"),
      electionDescription: isNotEmpty("Election description is required"),
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
      created_by_name: empDetails.empName,
      created_by_empid: empDetails.empId,
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
