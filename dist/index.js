"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendor_1 = __importDefault(require("./routes/vendor"));
const order_1 = __importDefault(require("./routes/order"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/vendor', vendor_1.default);
app.use('/api/v1/order', order_1.default);
app.use((error, req, res, next) => {
    res.status(500).json({
        message: 'Internal Server Error'
    });
});
exports.default = app;
