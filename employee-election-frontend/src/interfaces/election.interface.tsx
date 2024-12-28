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
  user_id: number;
  user_name: string;
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
  user_name: string;
}

export interface DistributionOfVotesPercentage {
  user_name: string;
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
  user_name: string;
  created_at: Date;
  "total_votes_%": number;
}

export interface NominationFormProps {
  isOpened: boolean;
  onClose: () => void;
  electionDetails?: DashboardElectionDetails | null;
  activeModalType?: string;
}

export interface PublishNominationElectionProps {
  isOpened: boolean;
  onClose: () => void;
  renderNominationModal: boolean;
  electionDetails: DashboardElectionDetails | null;
}

export interface createElectionInterface {
  election_title: string;
  election_description: string;
  election_reward: string;
  election_eligibility: ElectionEligibility;
  created_by_name: string;
  created_by_empid: number;
}

export interface ElectionEligibility {
  nomination_eligibility: string;
  voting_eligibility: string;
}

export interface UpdateElection {
  nomination_start_date?: Date | null;
  nomination_end_date?: Date | null;
  voting_start_date?: Date | null;
  voting_end_date?: Date | null;
  results_published_date?: Date | null;
}

export interface CreateNominationForm {
  rckr_emp_id: number;
  user_id: number;
  user_name: string;
  appeal: string;
}

export interface DashboardElectionDetails {
  election_id: number;
  election_title: string;
  nomination_start_date: string | null;
  nomination_end_date: string | null;
  voting_start_date: string | null;
  voting_end_date: string | null;
  results_published_date: string | null;
  created_at?: string;
  created_by_empid?: number;
  created_by_name?: string;
}

export interface VotingList {
  nomination_id: number;
  election_id: number;
  user_id: number;
  user_name: string;
  appeal: string;
  created_at: Date;
}

export interface VotingListProps {
  electionDetails: DashboardElectionDetails | null;
  isOpened: boolean;
  onClose: () => void;
  activeModalType: string;
}

export interface TimerProps {
  votingEndTime: string;
  onExpire: () => void;
  isValidDate: boolean;
}

export interface StatCard {
  title: string;
  value: number;
}

export interface WinnerDetail {
  title: string;
  value: string | number;
}

export interface ColumnData {
  title: string;
  field: string;
}

export interface DownloadReportButtonProps {
  StatCards: StatCard[];
  resultsColData: ColumnData[];
  resultsRowData: Record<string, any>[];
  winnerDetails: WinnerDetail[];
  empVoteList: EmpVoteList[];
  electionDetails: DashboardElectionDetails | null;
}

export interface EmpVoteList {
  user_id: number;
  user_name: string;
}

export interface ElectionDetailsProps {
  setTab?: string;
}
