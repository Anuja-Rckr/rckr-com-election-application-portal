import { api } from "./axios";

export const getElectionCards = async () => {
  try {
    const response = await api.get("election-cards/");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionList = async () => {
  try {
    const response = await api.get("elections-list/");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionOverview = async (electionId: number) => {
  try {
    const response = await api.get(`election-overview-details/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionNominationDetails = async (electionId: number) => {
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
  electionId: number
) => {
  try {
    const response = await api.get(`election-nomination-candidates-list/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionWinnerDetails = async (electionId: number) => {
  try {
    const response = await api.get(`election-winner-details/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionResultsCharts = async (electionId: number) => {
  try {
    const response = await api.get(`election-results-charts/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getElectionResultsTable = async (electionId: number) => {
  try {
    const response = await api.get(`election-results-table/`, {
      params: { election_id: electionId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
