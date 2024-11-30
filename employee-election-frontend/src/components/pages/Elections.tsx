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
  const [totalRows, setTotalRows] = useState<number>(0);

  const [searchInput, setSearchInput] = useState<string>("");

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<boolean>(false);

  const fetchElectionCards = async () => {
    const response: CountCardInterface[] = await getElectionCards();
    setElectionCardsData(response);
  };

  const fetchElectionList = async () => {
    const response: ElectionInterface = await getElectionList(
      searchInput,
      sortField,
      sortDirection,
      pageNumber
    );
    setElectionListColData(response.col_data);
    setElectionListRowData(response.row_data);
    setTotalRows(response.total_rows);
  };

  useEffect(() => {
    const fetchCards = async () => {
      await fetchElectionCards();
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      await fetchElectionList();
    };

    fetchList();
  }, [searchInput, sortField, sortDirection, pageNumber]);

  const handleSearch = (searchString: string) => {
    setSearchInput(searchString);
  };

  const handlePagination = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleSort = (sortField: string, sortDirection: boolean) => {
    setSortField(sortField);
    setSortDirection(sortDirection);
  };

  return (
    <>
      <CountCard cardsData={electionCardsData} />
      <FlatTable
        colData={electionListColData}
        rowData={electionListRowData}
        showSearch={true}
        showSort={true}
        totalRows={totalRows}
        handleSearch={handleSearch}
        handlePagination={handlePagination}
        handleSort={handleSort}
      />
    </>
  );
};

export default Elections;
