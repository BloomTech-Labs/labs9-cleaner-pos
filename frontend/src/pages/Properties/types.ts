import { number } from 'yup';

export interface HousesEnum extends Array<House> {}
export interface ListProps {
  list: List[];
  type: string;
  list_id?: number;
  submitNew: any;
  deleteTasks: any;
  deleteList?: any;
  putTasks?: any;
}

export interface House {
  id?: number;
  name: string;
  address: string;
  price: number;
  cleaning_fee: number;
  extra_guest_fee: number;
  default_ast?: string;
  manager?: string;
  guest_guide?: any;
  ast_guide?: any;
  checkList?: any;
  photo_url: string;
  openAst?: any;
  default_ast_name: string;
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
  list_id: number;
}
