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
}

export interface ElectionInterface {
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
