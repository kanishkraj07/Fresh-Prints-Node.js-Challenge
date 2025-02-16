import express, { Request, Response } from "express";
import { Apparel, OrderRequest } from '../models/stock';
import { getStockData } from '../util';

const orderRouter = express.Router();

orderRouter.post('/check', (req: Request, res: Response) => {
    const order = req.body as OrderRequest;

    if(!order || !order?.items || !Array.isArray(order.items)) {
        res.status(400).json({
            message: 'Incorrect order details'
        });
        return;
    }

    const stock: Apparel[] = getStockData();
    const isOrderFulfilled = order.items.every(item => {
       const data =  stock.find(st => st.code === item.code && st.size === item.size);
       return data && data.quantity >= item.quantity
    });
    res.status(200).json({
        isOrderFulfilled
    })
});

orderRouter.post("/cost", (req: Request, res: Response) => {
    const { items }: OrderRequest = req.body;
    if (!Array.isArray(items)) {
        res.status(400).json({
            message: 'Incorrect order details'
        });
        return;
    }

    const stock = getStockData();
    
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

export default orderRouter;