import Product from './Product';

export interface purchaseProducts {
    product_id: Product;
    quantity: number;
    color: string;
    size: string
}

export interface Order {
    _id: string;
    user_id : string;
    orderProducts: [purchaseProducts],
    purchase_date: Date,
    billing_address: string;
    total_price: number;
    order_status: string;
}