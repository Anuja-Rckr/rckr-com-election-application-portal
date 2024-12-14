import { getElectionStatus, getUserDetails } from "../common/utils";
import {
  createElectionInterface,
  CreateNominationForm,
  UpdateElection,
} from "../interfaces/election.interface";
import { api } from "./axios";

export const getElectionCards = async () => {
  try {
    const response = await api.get("election/cards");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionList = async (
  searchInput: string,
  sortField: string,
  sortDirection: boolean,
  pageNumber: number
) => {
  try {
    const response = await api.get("elections/list", {
      params: {
        search_input: searchInput,
        page: pageNumber,
        sort_field: sortField,
        sort_direction: sortDirection ? "asc" : "desc",
      },
    });

    const colData = response.data.data.col_data;
    const rowData = response.data.data.row_data.map((election: any) => ({
      ...election,
      election_status: getElectionStatus(election),
    }));

    return {
      col_data: colData,
      row_data: rowData,
      total_rows: response.data.data.total_rows,
    };
  } catch (error) {
    throw error;
  }
};

export const getElectionOverview = async (electionId: string) => {
  try {
    const response = await api.get(`election/overview/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionNominationDetails = async (electionId: string) => {
  try {
    const response = await api.get(`election/nomination-details/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionNominationCandidateList = async (
  electionId: string
) => {
  try {
    const response = await api.get(`election/nomination/list/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionWinnerDetails = async (electionId: string) => {
  try {
    const response = await api.get(`election/winner/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionResultsCharts = async (electionId: string) => {
  try {
    const response = await api.get(`election/charts/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionResultsTable = async (electionId: string) => {
  try {
    const response = await api.get(`election/results/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getYourNominationsCards = async () => {
  try {
    const empDetails = getUserDetails();
    const response = await api.get(
      `your-nominations/cards/${empDetails.empId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getYourNominationsTable = async (
  searchInput: string,
  sortField: string,
  sortDirection: boolean,
  pageNumber: number
) => {
  try {
    const empDetails = getUserDetails();
    const response = await api.get(
      `your-nominations/list/${empDetails.empId}`,
      {
        params: {
          search_input: searchInput,
          page: pageNumber,
          sort_field: sortField,
          sort_direction: sortDirection ? "desc" : "asc",
        },
      }
    );
    const colData = response.data.data.col_data;
    const rowData = response.data.data.row_data.map((election: any) => ({
      ...election,
      election_status: getElectionStatus(election),
    }));

    return {
      col_data: colData,
      row_data: rowData,
      total_rows: response.data.data.total_rows,
    };
  } catch (error) {
    throw error;
  }
};

export const createElection = async (requestBody: createElectionInterface) => {
  try {
    const response = await api.post("election", requestBody);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateElectionDetails = async (
  requestBody: UpdateElection,
  electionId: number
) => {
  try {
    const response = await api.put(`election/${electionId}`, requestBody);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createNomination = async (
  requestBody: CreateNominationForm,
  electionId: number
) => {
  try {
    const response = await api.post(
      `election/${electionId}/nomination`,
      requestBody
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionTimeline = async (electionId: string) => {
  try {
    const response = await api.get(`election-timeline/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardElectionList = async () => {
  try {
    const response = await api.get(`dashboard/election/list`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getVotingList = async (electionId: number) => {
  try {
    const response = await api.get(`election/voting/list/${electionId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const castVote = async (requestBody: any, electionId: number) => {
  try {
    const response = await api.post(`election/${electionId}/vote`, requestBody);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getEmpVoteStatus = async (empId: number, electionId: number) => {
  try {
    const response = await api.get(
      `election/vote/status/${empId}/${electionId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getEmpNominationStatus = async (
  empId: number,
  electionId: number
) => {
  try {
    const response = await api.get(
      `election/nomination/status/${empId}/${electionId}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
