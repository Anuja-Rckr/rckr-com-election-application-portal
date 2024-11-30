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

export interface NominationFormProps {
  isOpened: boolean;
  onClose: () => void;
}

export interface PublishNominationElectionProps {
  isOpened: boolean;
  onClose: () => void;
  renderNominationModal: boolean;
}

export interface createElectionInterface {
  election_title: string;
  election_description: string;
  election_cutoff: number;
  election_reward: string;
  election_eligibility: ElectionEligibility;
  created_by_name: string;
  created_by_empid: number;
}

export interface ElectionEligibility {
  nomination_eligibility: string;
  voting_eligibility: string;
}

export interface UpdateNominationDetails {
  nomination_start_date: Date | null;
  nomination_end_date: Date | null;
}

export interface UpdateVotingDetails {
  voting_start_date: Date | null;
  voting_end_date: Date | null;
}

export interface CreateNominationForm {
  emp_id: number;
  emp_name: string;
  emp_role: string;
  appeal: string;
}
