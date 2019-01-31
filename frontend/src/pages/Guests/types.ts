import { RouteComponentProps } from 'react-router-dom';

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

export interface GuestProps {
  stay_id: number;
  guest_name: string;
  house_id: number;
  house_name: string;
  house_address: string;
  default_ast: string;
  guest_guide: string;
  ast_guide: string;
  check_in: string;
  check_out: string;
  errors: {
    msg: string;
    error: boolean;
  };
  // tslint:disable-next-line
  Uppy: Function;
  goBack: () => void;
}

// Checklists

export type ListTypes = 'before' | 'during' | 'after';

interface Checkitem {
  complete: boolean;
  task: string;
  items_id: number;
  stay_id: number;
}

export interface ChecklistsData {
  before: Checkitem[];
  during: Checkitem[];
  // DONE: Figure out to dynamically type "hours after X"
  // Resource 1: https://github.com/Microsoft/TypeScript/issues/7803#issuecomment-205279410
  // Resource 2: https://stackoverflow.com/a/53084649
  after: Array<{
    [key: string]: Array<{
      complete: boolean;
      task: string;
      items_id: number;
      stay_id: number;
    }>;
  }>;
}

// AstDropdown

interface OpenAst {
  full_name: string;
  ast_id: number;
  house_id: number;
}

export interface House {
  id: number;
  name: string;
  address: string;
  default_ast: number;
  default_ast_name: string;
  manager: number;
  guest_guide: string;
  ast_guide: string;
  openAst: OpenAst[];
  checkList: Array<{ count: number }>;
}
