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

export const getYourNominationsCards = async (empId: string = "102") => {
  try {
    const response = await api.get(`your-nominations-cards/`, {
      params: { emp_id: empId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getYourNominationsTable = async (empId: string = "102") => {
  try {
    const response = await api.get(`your-nominations-list/`, {
      params: { emp_id: empId },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
