import { useEffect, useState } from "react";
import CountCard from "../common/CountCard";
import FlatTable from "../common/FlatTable";
import { getElectionCards, getElectionList } from "../../services/ApiService";
import {
  ColumnData,
  CountCardInterface,
  ElectionInterface,
  ElectionRowData,
} from "../../interfaces/common.interface";

const Elections = () => {
  const [electionCardsData, setElectionCardsData] = useState<
    CountCardInterface[]
  >([]);
  const [electionListColData, setElectionListColData] = useState<ColumnData[]>(
    []
  );
  const [electionListRowData, setElectionListRowData] = useState<
    ElectionRowData[]
  >([]);

  const fetchElectionCards = async () => {
    const response: CountCardInterface[] = await getElectionCards();
    setElectionCardsData(response);
  };

  const fetchElectionList = async () => {
    const response: ElectionInterface = await getElectionList();
    setElectionListColData(response.col_data);
    setElectionListRowData(response.row_data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchElectionCards();
      await fetchElectionList();
    };

    fetchData();
  }, []);

  return (
    <>
      <CountCard cardsData={electionCardsData} />
      <FlatTable colData={electionListColData} rowData={electionListRowData} />
    </>
  );
};

export default Elections;
