import express from "express";
import vendorRouter from "./routes/vendor";
import orderRouter from "./routes/order";

const app = express();

app.use(express.json());

app.use('/api/v1/vendor', vendorRouter);
app.use('/api/v1/order', orderRouter);


app.use((error, req, res, next) => {
    res.status(500).json({
        message: 'Internal Server Error'
    })
});

export default app;