export interface Itransactions {
  id: number;
  date: string;
  category: string;
  receiver: string;
  price: number;
  VAT: number;
  total_price: number;
  products: Iproducts[];
}

export interface Iproducts {
  id: number;
  description: string;
  amount: number;
  price: number;
  VAT: number;
  total_price: number;
}

export interface Iusers {
  first_name: string;
  last_name: string;
  id: number;
  email: string;
  password: string;
  profile_picture: string;
  role: string;
  permissions: string;
}
