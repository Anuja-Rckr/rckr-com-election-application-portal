import { getUserDetails } from "../common/utils";
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
        sort_direction: sortDirection ? "desc" : "asc",
      },
    });
    return response.data.data;
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
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createElection = async (requestBody: createElectionInterface) => {
  try {
    const response = await api.post("election/", requestBody);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateElectionDetails = async (
  requestBody: UpdateElection,
  electionId: number = 6
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
  electionId: number = 6
) => {
  try {
    const response = await api.post(
      `election/${electionId}/nomination`,
      requestBody,
      {
        params: { election_id: electionId },
      }
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
