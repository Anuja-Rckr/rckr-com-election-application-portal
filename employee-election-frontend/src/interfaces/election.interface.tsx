export interface NominationPhaseInterface {
  title: string;
  start_date: string;
  end_date: string;
  total_nominations: number;
}

export interface VotingPhaseInterface {
  title: string;
  start_date: string;
  end_date: string;
  total_votes: number;
}

export interface ResultsPhaseInterface {
  title: string;
  published_on: string;
}

export interface ElectionDetailsInterface {
  nomination_details: NominationPhaseInterface;
  voting_details: VotingPhaseInterface;
  results_details: ResultsPhaseInterface;
}

export interface overviewData {
  title: string;
  value: string;
  type: string;
}

export interface NominationCardDetails {
  nomination_id: number;
  election_id: number;
  emp_id: number;
  emp_name: string;
  emp_role: string;
  appeal: string;
  created_at: Date;
}

export interface ResultsChart {
  distribution_of_votes_number: DistributionOfVotesNumber[];
  distribution_of_votes_percentage: DistributionOfVotesPercentage[];
  stat_cards: StatCard[];
}

export interface DistributionOfVotesNumber {
  total_votes: number;
  emp_name: string;
}

export interface DistributionOfVotesPercentage {
  emp_name: string;
  total_votes: number;
  color: string;
}

export interface StatCard {
  title: string;
  value: number;
  icon: string;
}

export interface resultsTableData {
  total_votes: number;
  emp_name: string;
  emp_role: string;
  created_at: Date;
  "total_votes_%": number;
}
