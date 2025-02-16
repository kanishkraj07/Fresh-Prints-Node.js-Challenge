import { expect, describe, it } from 'vitest'
import request from 'supertest';
import app from '..';
import { getStockData } from '../util';

describe('Stock Server', () => {
    describe('Vendor Router', () => {
       describe('Update stock & price for a single apparel', () => {
            it('success', async() => {
            const res = await request(app).put("/api/v1/vendor/stock/update").send({
                    code: "1111",
                    size: "L",
                    quantity: 10,
                    price: 500
                });
                const stockData = getStockData();

                expect(stockData.find(st => st.code === '1111')).toBeTruthy();
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual('Stock Updated Successfully')
            });

            it('Error Handling', async() => {
                const res = await request(app).put("/api/v1/vendor/stock/update").send({
                    code: "1111",
                }); 
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Incorrect Inputs')
            });
        });

        describe('Update stock & price for apparels in bulk', () => {
            it('success', async() => {
            const res = await request(app).put("/api/v1/vendor/stock/bulk-update").send([{
                    code: "2222",
                    size: "M",
                    quantity: 20,
                    price: 1500
                }]);
                const stockData = getStockData();

                expect(stockData.find(st => st.code === '2222')).toBeTruthy();
                expect(res.statusCode).toEqual(200);
                expect(res.body.message).toEqual('Bulk stock sucessfully updated')
            });

            it('Error Handling', async() => {
                const res = await request(app).put("/api/v1/vendor/stock/bulk-update").send({}); 
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Incorrect Inputs')
            });
        });
    });

    describe('Order Router', () => {
        describe('Check an order can be fulfilled or not', () => {
            it('success', async() => {
            const res = await request(app).post("/api/v1/order/check").send({ 
                items: [{
                    code: "1111",
                    size: "L",
                    quantity: 5
                }]});
                expect(res.statusCode).toEqual(200);
                expect(res.body.isOrderFulfilled).toBe(true);
            });

            it('Error Handling', async() => {
                const res = await request(app).post("/api/v1/order/check").send({}); 
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Incorrect order details')
            });
        });

        describe('Retreive the lowest cost for an order', () => {
            it('success', async() => {
            const res = await request(app).post("/api/v1/order/cost").send({
                items: [
                    {
                        code: "2222",
                        size: "L",
                        quantity: 2
                    }
                ]
            });
                expect(res.statusCode).toEqual(200);
                expect(res.body.cost).toBe(1000);
            });

            it('Error Handling', async() => {
                const res = await request(app).post("/api/v1/order/cost").send({}); 
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Incorrect order details')
            });
        });
    });
})