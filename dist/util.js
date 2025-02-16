"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStockData = exports.getStockData = void 0;
const fs_1 = __importDefault(require("fs"));
const STOCK_DATA_FILE = './stock-data.json';
const getStockData = () => {
    if (!fs_1.default.existsSync(STOCK_DATA_FILE)) {
        fs_1.default.writeFileSync(STOCK_DATA_FILE, "[]");
        return [];
    }
    const data = JSON.parse(fs_1.default.readFileSync(STOCK_DATA_FILE, 'utf-8'));
    return data;
};
exports.getStockData = getStockData;
const updateStockData = (data) => {
    fs_1.default.writeFileSync(STOCK_DATA_FILE, JSON.stringify(data));
};
exports.updateStockData = updateStockData;
