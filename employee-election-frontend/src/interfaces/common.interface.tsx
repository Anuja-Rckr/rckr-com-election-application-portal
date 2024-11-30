import { ReactNode } from "react";

export interface CountCardInterface {
  title: string;
  value: number;
  icon: ReactNode;
}

export interface ColumnData {
  title: string;
  field: string;
  type: string;
  path?: string;
}

export interface ElectionRowData {
  election_id: string;
  election_title: string;
  nomination_start_date: string;
  nomination_end_date: string;
  voting_start_date: string;
  voting_end_date: string;
  created_by_name: string;
  election_status: string;
  created_at: string;
}

export interface ElectionInterface {
  col_data: ColumnData[];
  row_data: ElectionRowData[];
  total_rows: number;
}

export interface CountCardPropsInterface {
  type?: "grid" | "stack";
  cardsData: CountCardInterface[];
}

export interface FlatTablePropsInterface {
  colData: ColumnData[];
  rowData: any;
  totalRows?: number;
  showSearch?: boolean;
  showSort?: boolean;
  handleSearch?: (value: string) => void;
  handlePagination?: (value: number) => void;
  handleSort?: (sortField: string, sortDirection: boolean) => void;
}

export interface EmpDetailsInterface {
  empId: number;
  empName: string;
  empRole: string;
  isAdmin: boolean;
}
