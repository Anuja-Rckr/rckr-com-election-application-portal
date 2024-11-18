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
