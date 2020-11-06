import path from 'path'
import express from 'express';
import dotenv from 'dotenv';

// these are the files use .js
import connectDB from './config/db.js';

// This is for routing
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// This is for error handling

import { notFound, erroHandler } from './middleware/errorMiddleWare.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // this will allow us to use json data in body

dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload' , uploadRoutes)

app.get('/api/config/paypal' , (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID)
})

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname ,'/uploads')))

app.use(notFound);
app.use(erroHandler);

app.listen(
  PORT,
  console.log(
    `Server running on port number ${PORT} in ${process.env.NODE_ENV} environment.`
  )
);
