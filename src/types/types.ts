// types.ts
export interface SalesForecastData {
    product_id: string;
    predicted_sales: number;
}

export interface ProductGrowthData {
    product_id: string;
    sales_growth: number;
}

export interface NegativeGrowthProduct {
    product_id: string;
    size: string;
    color: string;
    sales_growth: number;
    predicted_growth: number;
}
