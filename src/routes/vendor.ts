import  express  from 'express';
import { Apparel } from '../models/stock';
import { getStockData, updateStockData } from '../util';

const vendorRouter = express.Router();


vendorRouter.put('/stock/update', (req, res) => {
    const { code, size, quantity, price } = req.body as Apparel;

    if(!code || !size || !quantity || !price) {
        res.status(400).json({ message: 'Incorrect Inputs' });
        return;
    }

    const stock: Apparel[] = getStockData();
    
    if(stock.length) {
        const data = stock.find(st => st.code === code && st.size === size);
        if(data) {
            data.quantity = quantity;
            data.price = price;
        } else {
            stock.push({ code, size, quantity, price });
        }
    } else {
        stock.push({ code, size, quantity, price });
    }

    updateStockData(stock);

    res.status(200).json({
        message: 'Stock Updated Successfully'
    })
});

vendorRouter.put('/stock/bulk-update', (req, res) => {
    const data: Apparel[] = req.body as Apparel[];

    if(!data || !Array.isArray(data) || !data.length) {
        res.status(400).json({ message: 'Incorrect Inputs' });
        return;
    }

    const stock: Apparel[] = getStockData();

    data.forEach((apparel: Apparel) => {
        const { code, size, quantity, price } = apparel;

        if(code && size && quantity && price) {
            if(stock.length) {
                const data = stock.find(st => st.code === code && st.size === size);
                if(data) {
                    data.quantity = quantity;
                    data.price = price;
                } else {
                    stock.push({ code, size, quantity, price });
                }
            } else {
                stock.push({ code, size, quantity, price });
            }
        }
    });

    updateStockData(stock);

    res.status(200).json({
        message: 'Bulk stock sucessfully updated'
    }); 
});


export default vendorRouter;