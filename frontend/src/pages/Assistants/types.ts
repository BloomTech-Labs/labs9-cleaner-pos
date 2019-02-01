import { number } from 'yup';

export interface AssistantsEnum extends Array<Assistant> {}
export interface ListProps {
  list: List[];
  type: string;
  list_id?: number;
  submitNew: any;
  deletetasks: any;
  deleteList?: any;
}

export interface Assistant {
  user_id: number;
  ast_id: number;
  itemCount: number;
  houseCount: number;
  house_id: number;
  full_name: string;
  address?: string;
  photo_url: string;
}

export interface AssistantDetails {
  user_id: number;
  ast_id: number;
  full_name: string;
  photo_url?: string | null;
  default_house: List[];
  avl_houses: List[];
  address?: string | null;
}

export interface Lists {
  before: List[];
  during: List[];
  after: AfterLists[];
  before_id: number;
  during_id: number;
  after_id?: number;
}

interface AfterLists {
  time: string;
  afterLists: List[];
  after_id: number;
}

export interface List {
  task: string;
  items_id: number;
}
