import mongoose from 'mongoose'

// Because anytime we try to connect to mongoDB or something ,
// mongoose.connect() always return a promise
const connectDB = async() =>{
    try{

        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology : true,
            useNewUrlParser: true,
            useCreateIndex : true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(error){
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}

export default connectDB ;
