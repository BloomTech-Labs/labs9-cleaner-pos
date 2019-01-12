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
}

export interface Stay {
  id?: number;
  guest_id: number;
  house_id: number;
  extra_guests?: number;
  check_in?: string;
  check_out?: string;
  url_id?: string;
  created_at?: string;
}

export interface List {
  id?: number;
  type: string;
  house_id: number;
}
