import { useEffect, useState } from "react";
import CountCard from "../common/CountCard";
import FlatTable from "../common/FlatTable";
import {
  getYourNominationsCards,
  getYourNominationsTable,
} from "../../services/ApiService";
import {
  ColumnData,
  CountCardInterface,
  ElectionInterface,
} from "../../interfaces/common.interface";

const YourNominations = () => {
  const [electionCardsData, setElectionCardsData] = useState<
    CountCardInterface[]
  >([]);
  const [colData, setColData] = useState<ColumnData[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);

  const [totalRows, setTotalRows] = useState<number>(0);

  const [searchInput, setSearchInput] = useState<string>("");

  const [pageNumber, setPageNumber] = useState<number>(1);

  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<boolean>(false);

  const fetchNominationCards = async () => {
    const response: CountCardInterface[] = await getYourNominationsCards();
    setElectionCardsData(response);
  };

  const fetchNominationList = async () => {
    const response: any = await getYourNominationsTable(
      searchInput,
      sortField,
      sortDirection,
      pageNumber
    );
    setColData(response.col_data);
    setRowData(response.row_data);
    setTotalRows(response.total_rows);
  };

  useEffect(() => {
    const fetchCards = async () => {
      await fetchNominationCards();
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNominationList();
    };

    fetchData();
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
        colData={colData}
        rowData={rowData}
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

export default YourNominations;
