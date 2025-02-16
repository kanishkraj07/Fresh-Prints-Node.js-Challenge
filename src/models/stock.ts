export interface Apparel {
    code: string;
    size: string;
    quantity: number;
    price: number;
}
  

export type OrderItem = Pick<Apparel, 'code' | 'size' | 'quantity'>
  
export interface OrderRequest {
    items: OrderItem[];
}