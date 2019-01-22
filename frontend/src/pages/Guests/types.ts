import { RouteComponentProps } from 'axios';

// Guests
export interface GuestsProps {
  stay_id: number;
  house_id: number;
  guest_name: string;
  house_name: string;
  check_in: string;
  check_out: string;
  progress: number;
  className?: string;
}

export type FilterArgs = 'all' | 'upcoming' | 'complete' | 'incomplete';
// Guest Detail

export interface GuestProps extends RouteComponentProps {
  guest_name: string;
  house_id: number;
  house_address: string;
  default_ast: string;
  guest_guide: string;
  ast_guide: string;
  check_in: string;
  check_out: string;
}
