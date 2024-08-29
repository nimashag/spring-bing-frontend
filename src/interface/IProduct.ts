export interface IProduct {
    id: string;
    name: string;
    unit_price: number;
    metadata: [
        { color: string; size: string; quantity: number } 
    ],
    description: string;
    category: string[]; 
    sub_category: string[]; 
    images_path: string[]; 
}

export interface cartItem {
    product: Product;
    quantity: number;
}