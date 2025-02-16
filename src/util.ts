import fs from 'fs';
import { Apparel } from "./models/stock";

const STOCK_DATA_FILE: string = './stock-data.json';

export const getStockData = (): Apparel[] => {

    if(!fs.existsSync(STOCK_DATA_FILE)) {
        fs.writeFileSync(STOCK_DATA_FILE, "[]");
        return [];
    }
    const data: Apparel[] = JSON.parse(fs.readFileSync(STOCK_DATA_FILE, 'utf-8'));
    return data;
}

export const updateStockData = (data: Apparel[]): void => {
    fs.writeFileSync(STOCK_DATA_FILE, JSON.stringify(data));
}