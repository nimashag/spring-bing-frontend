interface Product {
    _id: string;
    name: string;
    unit_price: number;
    metadata: {
        color: string;
        size: string;
        quantity: number;
        _id: string;
    }[];
    description: string;
    category: string[];
    sub_category: string[];
    images_path: string[];
    date: string;
    createdAt: string;
    updatedAt: string;
}

export default Product;

export interface cartItem {
    product: Product;
    quantity: number;
}