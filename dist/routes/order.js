"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("../util");
const orderRouter = express_1.default.Router();
orderRouter.post('/check', (req, res) => {
    const order = req.body;
    if (!order || !(order === null || order === void 0 ? void 0 : order.items) || !Array.isArray(order.items)) {
        res.status(400).json({
            message: 'Incorrect order details'
        });
        return;
    }
    const stock = (0, util_1.getStockData)();
    const isOrderFulfilled = order.items.every(item => {
        const data = stock.find(st => st.code === item.code && st.size === item.size);
        return data && data.quantity >= item.quantity;
    });
    res.status(200).json({
        isOrderFulfilled
    });
});
orderRouter.post("/cost", (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items)) {
        res.status(400).json({
            message: 'Incorrect order details'
        });
        return;
    }
    const stock = (0, util_1.getStockData)();
    let cost = 0;
    items.forEach(item => {
        const data = stock.find((s) => s.code === item.code && s.size === item.size);
        if (!data || data.quantity < item.quantity) {
            res.status(400).json({ message: "Order cannot be fulfilled" });
            return;
        }
        cost += data.price * item.quantity;
    });
    res.status(200).json({
        cost
    });
});
exports.default = orderRouter;
