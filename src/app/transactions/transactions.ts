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
