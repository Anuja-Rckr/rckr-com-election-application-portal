import { useEffect, useState } from "react";
import {
  VotingList,
  VotingListProps,
} from "../../../interfaces/election.interface";
import {
  castVote,
  getEmpVoteStatus,
  getVotingList,
} from "../../../services/ApiService";
import {
  Alert,
  Button,
  Drawer,
  Group,
  Modal,
  Table,
  Text,
} from "@mantine/core";
import {
  ColumnData,
  EmpDetailsInterface,
} from "../../../interfaces/common.interface";
import { DATA, GREEN, RED, VOTING_LIVE } from "../../../common/constants";
import Timer from "../../common/Timer";
import {
  getElectionStatus,
  getUserDetails,
  isDateValid,
} from "../../../common/utils";
import { IconCircleCheck, IconSquareRoundedX } from "@tabler/icons-react";

const Voting = ({
  electionDetails,
  isOpened,
  onClose,
  activeModalType,
}: VotingListProps) => {
  const empDetails: EmpDetailsInterface = getUserDetails();
  const [votingList, setVotingList] = useState<VotingList[]>([]);
  const [votingListColumnData, setVotingListColumnData] = useState<
    ColumnData[]
  >([]);
  const [isVotingDisabled, setIsVotingDisabled] = useState<boolean>(false);
  const [currentVote, setCurrentVote] = useState<VotingList | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isTimerCompleted, setIsTimerCompleted] = useState<boolean>(false);

  const fetchVotingList = async () => {
    if (electionDetails?.election_id) {
      const response = await getVotingList(electionDetails?.election_id);
      setVotingList(response.row_data);
      setVotingListColumnData(response.column_data);
    }
  };

  const triggerConfirmVoteModal = (voteDetails: VotingList) => {
    setCurrentVote(voteDetails);
    setIsConfirmModalOpen(true);
  };

  const handleClose = () => {
    onClose();
  };

  const handleTimerExpire = () => {
    setIsVotingDisabled(true);
    setIsTimerCompleted(true);
  };

  const onConfirmVote = async () => {
    if (electionDetails?.election_id) {
      const requestBody = {
        emp_id: empDetails.empId,
        emp_name: empDetails.empName,
        emp_role: empDetails.empRole,
        nominee_emp_id: currentVote?.emp_id,
      };
      const response = castVote(requestBody, electionDetails?.election_id);
      setIsConfirmModalOpen(false);
      setIsVotingDisabled(true);
      handleClose();
    }
  };

  const fetchEmpVoteStatus = async () => {
    if (electionDetails?.election_id) {
      const response = await getEmpVoteStatus(
        empDetails.empId,
        electionDetails?.election_id
      );
      setIsVotingDisabled(response.is_emp_voted);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchEmpVoteStatus();
      await fetchVotingList();
    };
    if (isOpened && activeModalType === "voting") {
      fetchData();
    }
  }, [isOpened, electionDetails, activeModalType]);

  return (
    <>
      <Drawer
        opened={isOpened}
        onClose={handleClose}
        title={<Text fw={700}>Vote</Text>}
        position="right"
      >
        {isDateValid(
          electionDetails?.voting_start_date,
          electionDetails?.voting_end_date
        ) &&
          electionDetails?.voting_end_date && (
            <Timer
              isValidDate={isDateValid(
                electionDetails.voting_start_date,
                electionDetails.voting_end_date
              )}
              votingEndTime={electionDetails.voting_end_date}
              onExpire={handleTimerExpire}
            />
          )}
        {!isDateValid(
          electionDetails?.voting_start_date,
          electionDetails?.voting_end_date
        ) &&
          electionDetails?.voting_start_date && (
            <Timer
              isValidDate={isDateValid(
                electionDetails.voting_start_date,
                electionDetails.voting_end_date
              )}
              votingEndTime={electionDetails.voting_start_date}
              onExpire={handleTimerExpire}
            />
          )}
        {isVotingDisabled && !isTimerCompleted && (
          <Alert
            variant="light"
            color={GREEN}
            title="Your vote recorded successfully"
            icon={<IconCircleCheck size={50} />}
          ></Alert>
        )}
        {isVotingDisabled && isTimerCompleted && (
          <Alert
            variant="light"
            color={RED}
            title="The voting period has ended"
            icon={<IconSquareRoundedX size={50} />}
          ></Alert>
        )}
        <Table stickyHeader stickyHeaderOffset={60} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              {votingListColumnData.map((col: ColumnData, index: number) => (
                <Table.Th key={index} className="text-center wrap-text">
                  {col.title}
                </Table.Th>
              ))}
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {votingList.map((row: any, rowIndex: number) => (
              <Table.Tr key={rowIndex}>
                {votingListColumnData.map((col, colIndex) => (
                  <Table.Td key={colIndex} className="text-center wrap-text">
                    {col.type === DATA && row[col.field]}
                  </Table.Td>
                ))}
                <Table.Td>
                  <Button
                    onClick={() => triggerConfirmVoteModal(row)}
                    disabled={
                      isVotingDisabled ||
                      !(getElectionStatus(electionDetails) === VOTING_LIVE)
                    }
                  >
                    Vote
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Drawer>
      <Modal
        opened={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Submission"
      >
        <Text>
          Are you sure you want to vote to{" "}
          <span className="highlight_name">
            <b>{currentVote?.emp_name}</b>
          </span>
          ?
        </Text>

        <Text color={RED} size="sm" mt="sm">
          Once the vote is submitted, it cannot be modified.
        </Text>

        <Group mt="md">
          <Button
            variant="default"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={onConfirmVote}>Confirm</Button>
        </Group>
      </Modal>
    </>
  );
};

export default Voting;
