import { useEffect, useState } from "react";
import CountCard from "../common/CountCard";
import FlatTable from "../common/FlatTable";
import {
  getElectionCards,
  getYourNominationsCards,
  getYourNominationsTable,
} from "../../services/ApiService";
import {
  ColumnData,
  CountCardInterface,
  ElectionInterface,
} from "../../interfaces/common.interface";
import { useParams } from "react-router-dom";

const YourNominations = () => {
  const { id } = useParams<{ id: string }>();
  const electionId = id;
  const [electionCardsData, setElectionCardsData] = useState<
    CountCardInterface[]
  >([]);
  const [colData, setColData] = useState<ColumnData[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);

  const fetchElectionCards = async () => {
    const response: CountCardInterface[] = await getYourNominationsCards();
    setElectionCardsData(response);
  };

  const fetchElectionList = async () => {
    const response: ElectionInterface = await getYourNominationsTable();
    setColData(response.col_data);
    setRowData(response.row_data);
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
      <FlatTable colData={colData} rowData={rowData} />
    </>
  );
};

export default YourNominations;
