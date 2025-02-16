"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const util_1 = require("../util");
const vendorRouter = express_1.default.Router();
vendorRouter.put('/stock/update', (req, res) => {
    const { code, size, quantity, price } = req.body;
    if (!code || !size || !quantity || !price) {
        res.status(400).json({ message: 'Incorrect Inputs' });
        return;
    }
    const stock = (0, util_1.getStockData)();
    if (stock.length) {
        const data = stock.find(st => st.code === code && st.size === size);
        if (data) {
            data.quantity = quantity;
            data.price = price;
        }
        else {
            stock.push({ code, size, quantity, price });
        }
    }
    else {
        stock.push({ code, size, quantity, price });
    }
    (0, util_1.updateStockData)(stock);
    res.status(200).json({
        message: 'Stock Updated Successfully'
    });
});
vendorRouter.put('/stock/bulk-update', (req, res) => {
    const data = req.body;
    if (!data || !Array.isArray(data) || !data.length) {
        res.status(400).json({ message: 'Incorrect Inputs' });
        return;
    }
    const stock = (0, util_1.getStockData)();
    data.forEach((apparel) => {
        const { code, size, quantity, price } = apparel;
        if (code && size && quantity && price) {
            if (stock.length) {
                const data = stock.find(st => st.code === code && st.size === size);
                if (data) {
                    data.quantity = quantity;
                    data.price = price;
                }
                else {
                    stock.push({ code, size, quantity, price });
                }
            }
            else {
                stock.push({ code, size, quantity, price });
            }
        }
    });
    (0, util_1.updateStockData)(stock);
    res.status(200).json({
        message: 'Bulk stock sucessfully updated'
    });
});
exports.default = vendorRouter;
