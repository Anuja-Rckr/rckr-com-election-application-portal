import { useEffect, useState } from "react";
import {
  VotingList,
  VotingListProps,
} from "../../../interfaces/election.interface";
import { getVotingList } from "../../../services/ApiService";
import { Button, Drawer, Group, Modal, Table, Text } from "@mantine/core";
import { ColumnData } from "../../../interfaces/common.interface";
import { DATA, RED } from "../../../common/constants";

const Voting = ({ electionDetails, isOpened, onClose }: VotingListProps) => {
  const [votingList, setVotingList] = useState<VotingList[]>([]);
  const [votingListColumnData, setVotingListColumnData] = useState<
    ColumnData[]
  >([]);

  const [currentVote, setCurrentVote] = useState<VotingList | null>(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchData = async () => {
      await fetchVotingList();
    };
    fetchData();
  }, [electionDetails]);

  return (
    <>
      <Drawer
        opened={isOpened}
        onClose={handleClose}
        title={<Text fw={700}>Vote</Text>}
        position="right"
      >
        <p>Timer</p>
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
                  <Button onClick={() => triggerConfirmVoteModal(row)}>
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
          <Button>Confirm</Button>
        </Group>
      </Modal>
    </>
  );
};

export default Voting;
