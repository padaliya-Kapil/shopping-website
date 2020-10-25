import express from 'express'
import dotenv from 'dotenv'

 
// this is the file use product.js
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

const PORT = process.env.PORT || 5000
 
const app = express()

dotenv.config()
connectDB()

app.get('/',(req, res)=>{
    res.send('API is running')
});

app.use('/api/products',productRoutes);

app.listen(PORT,console.log(`Server running on port number ${PORT} in ${process.env.NODE_ENV} environment.`))
