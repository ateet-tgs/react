export interface CartItem {
  id: string; // product ID
  sku: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  metadata?: Record<string, any>;
}

export interface ShippingInfo {
  method: string;
  tracking?: string;
  address: string;
}

export interface Cart {
  items: CartItem[];
  shipping?: ShippingInfo;
  totalQuantity: number;
  totalAmount: number;
}
