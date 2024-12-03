import { getUserDetails } from "../common/utils";
import {
  createElectionInterface,
  CreateNominationForm,
  UpdateNominationDetails,
  UpdateVotingDetails,
} from "../interfaces/election.interface";
import { api } from "./axios";

export const getElectionCards = async () => {
  try {
    const response = await api.get("election-cards/");
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
    const response = await api.get("elections-list/", {
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
    const response = await api.get(`election-overview-details/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionNominationDetails = async (electionId: string) => {
  try {
    const response = await api.get(`election-nomination-details/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionNominationCandidateList = async (
  electionId: string
) => {
  try {
    const response = await api.get(`election-nomination-candidates-list`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionWinnerDetails = async (electionId: string) => {
  try {
    const response = await api.get(`election-winner-details/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionResultsCharts = async (electionId: string) => {
  try {
    const response = await api.get(`election-results-charts/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionResultsTable = async (electionId: string) => {
  try {
    const response = await api.get(`election-results-table/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getYourNominationsCards = async () => {
  try {
    const empDetails = getUserDetails();
    const response = await api.get(`your-nominations-cards/`, {
      params: { emp_id: empDetails.empId },
    });
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
    const response = await api.get(`your-nominations-list/`, {
      params: {
        emp_id: empDetails.empId,
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

export const createElection = async (requestBody: createElectionInterface) => {
  try {
    const response = await api.post("create-election/", requestBody);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateNominationDetails = async (
  requestBody: UpdateNominationDetails,
  electionId: number = 6
) => {
  try {
    const response = await api.put("update-nomination-details", requestBody, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateVotingDetails = async (
  requestBody: UpdateVotingDetails,
  electionId: number = 6
) => {
  try {
    const response = await api.put("update-voting-details", requestBody, {
      params: { election_id: electionId },
    });
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
    const response = await api.post("create-nomination", requestBody, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionTimeline = async (electionId: string) => {
  try {
    const response = await api.get("election-timeline-details", {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
