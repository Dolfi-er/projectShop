export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  image: string;
}