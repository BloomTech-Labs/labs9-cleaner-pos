export interface HousesEnum extends Array<House> {}

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
  openAst?: any;
  default_ast_name: string;
}
