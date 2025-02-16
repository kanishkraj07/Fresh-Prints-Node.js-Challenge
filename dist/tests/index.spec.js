"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require(".."));
const util_1 = require("../util");
(0, vitest_1.describe)('Stock Server', () => {
    (0, vitest_1.describe)('Vendor Router', () => {
        (0, vitest_1.describe)('Update stock & price for a single apparel', () => {
            (0, vitest_1.it)('success', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).put("/api/v1/vendor/stock/update").send({
                    code: "1111",
                    size: "L",
                    quantity: 10,
                    price: 500
                });
                const stockData = (0, util_1.getStockData)();
                (0, vitest_1.expect)(stockData.find(st => st.code === '1111')).toBeTruthy();
                (0, vitest_1.expect)(res.statusCode).toEqual(200);
                (0, vitest_1.expect)(res.body.message).toEqual('Stock Updated Successfully');
            }));
            (0, vitest_1.it)('Error Handling', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).put("/api/v1/vendor/stock/update").send({
                    code: "1111",
                });
                (0, vitest_1.expect)(res.statusCode).toEqual(400);
                (0, vitest_1.expect)(res.body.message).toEqual('Incorrect Inputs');
            }));
        });
        (0, vitest_1.describe)('Update stock & price for apparels in bulk', () => {
            (0, vitest_1.it)('success', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).put("/api/v1/vendor/stock/bulk-update").send([{
                        code: "2222",
                        size: "M",
                        quantity: 20,
                        price: 1500
                    }]);
                const stockData = (0, util_1.getStockData)();
                (0, vitest_1.expect)(stockData.find(st => st.code === '2222')).toBeTruthy();
                (0, vitest_1.expect)(res.statusCode).toEqual(200);
                (0, vitest_1.expect)(res.body.message).toEqual('Bulk stock sucessfully updated');
            }));
            (0, vitest_1.it)('Error Handling', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).put("/api/v1/vendor/stock/bulk-update").send({});
                (0, vitest_1.expect)(res.statusCode).toEqual(400);
                (0, vitest_1.expect)(res.body.message).toEqual('Incorrect Inputs');
            }));
        });
    });
    (0, vitest_1.describe)('Order Router', () => {
        (0, vitest_1.describe)('Check an order can be fulfilled or not', () => {
            (0, vitest_1.it)('success', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).post("/api/v1/order/check").send({
                    items: [{
                            code: "1111",
                            size: "L",
                            quantity: 5
                        }]
                });
                (0, vitest_1.expect)(res.statusCode).toEqual(200);
                (0, vitest_1.expect)(res.body.isOrderFulfilled).toBe(true);
            }));
            (0, vitest_1.it)('Error Handling', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).post("/api/v1/order/check").send({});
                (0, vitest_1.expect)(res.statusCode).toEqual(400);
                (0, vitest_1.expect)(res.body.message).toEqual('Incorrect order details');
            }));
        });
        (0, vitest_1.describe)('Retreive the lowest cost for an order', () => {
            (0, vitest_1.it)('success', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).post("/api/v1/order/cost").send({
                    items: [
                        {
                            code: "2222",
                            size: "L",
                            quantity: 2
                        }
                    ]
                });
                (0, vitest_1.expect)(res.statusCode).toEqual(200);
                (0, vitest_1.expect)(res.body.cost).toBe(1000);
            }));
            (0, vitest_1.it)('Error Handling', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(__1.default).post("/api/v1/order/cost").send({});
                (0, vitest_1.expect)(res.statusCode).toEqual(400);
                (0, vitest_1.expect)(res.body.message).toEqual('Incorrect order details');
            }));
        });
    });
});
