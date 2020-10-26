import express from 'express'
import dotenv from 'dotenv'
 
// these are the files use .js 
import connectDB from './config/db.js'

// This is for routing
import productRoutes from './routes/productRoutes.js'

// This is for error handling

import {notFound,erroHandler} from './middleware/errorMiddleWare.js'

const PORT = process.env.PORT || 5000
 
const app = express()

dotenv.config()
connectDB()

app.get('/',(req, res)=>{
    res.send('API is running')
});

app.use('/api/products',productRoutes);

app.use(notFound)
app.use(erroHandler)


app.listen(PORT,console.log(`Server running on port number ${PORT} in ${process.env.NODE_ENV} environment.`))
