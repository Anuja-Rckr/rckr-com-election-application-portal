import { toast } from "../common/toast/ToastService";
import { fetchUserDetails, getElectionStatus } from "../common/utils";
import {
  createElectionInterface,
  CreateNominationForm,
  UpdateElection,
} from "../interfaces/election.interface";
import { api, authApi } from "./axios";

export const getUserInfo = async () => {
  try {
    const response = await authApi.get("auth/generate-token");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionCards = async () => {
  try {
    const response = await api.get("election/cards");
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
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
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionOverview = async (electionId: string) => {
  try {
    const response = await api.get(`election/overview/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionNominationDetails = async (electionId: string) => {
  try {
    const response = await api.get(`election/nomination-details/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionNominationCandidateList = async (
  electionId: string
) => {
  try {
    const response = await api.get(`election/nomination/list/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionWinnerDetails = async (
  electionId: string,
  userId: number
) => {
  try {
    const response = await api.get(`election/winner/${electionId}/${userId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionResultsCharts = async (electionId: string) => {
  try {
    const response = await api.get(`election/charts/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionResultsTable = async (electionId: string) => {
  try {
    const response = await api.get(`election/results/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getYourNominationsCards = async () => {
  try {
    const userDetails = fetchUserDetails();
    const response = await api.get(
      `your-nominations/cards/${userDetails.user_id}`
    );
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getYourNominationsTable = async (
  searchInput: string,
  sortField: string,
  sortDirection: boolean,
  pageNumber: number
) => {
  try {
    const userDetails = fetchUserDetails();
    const response = await api.get(
      `your-nominations/list/${userDetails.user_id}`,
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
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const createElection = async (requestBody: createElectionInterface) => {
  try {
    const response = await api.post("election", requestBody);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const updateElectionDetails = async (
  requestBody: UpdateElection,
  electionId: number
) => {
  try {
    const response = await api.put(`election/${electionId}`, requestBody);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
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
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getElectionTimeline = async (electionId: string) => {
  try {
    const response = await api.get(`election-timeline/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getDashboardElectionList = async () => {
  try {
    const response = await api.get(`dashboard/election/list`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getVotingList = async (electionId: number) => {
  try {
    const response = await api.get(`election/voting/list/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const castVote = async (requestBody: any, electionId: number) => {
  try {
    const response = await api.post(`election/${electionId}/vote`, requestBody);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getEmpVoteStatus = async (userId: number, electionId: number) => {
  try {
    const response = await api.get(
      `election/vote/status/${userId}/${electionId}`
    );
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getEmpNominationStatus = async (
  userId: number,
  electionId: number
) => {
  try {
    const response = await api.get(
      `election/nomination/status/${userId}/${electionId}`
    );
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const getEmpVoteList = async (electionId: string) => {
  try {
    const response = await api.get(`election/emp/vote/list/${electionId}`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};

export const onLogoutApi = async () => {
  try {
    const response = await api.post(`auth/logout`);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.response.data.error);
  }
};
