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
  hours_after?: number;
}

export interface Item {
  id?: number;
  task: string;
  list_id: number;
}

export interface Token {
  id: number;
  ext_it: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  photoUrl: string;
  stripeUID: string;
  setting_text: boolean;
  setting_email: boolean;
  created_at: string;
  iat: number;
}
