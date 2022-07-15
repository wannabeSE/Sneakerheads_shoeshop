const express =require('express')
const app= express()
const env =require('dotenv')
const mongoose=require('mongoose')
const port=8080
const userRoutes=require('./routes/userRouter')
const catrouter=require('./routes/catrouter')
const prodrouter=require('./routes/prodrouter')
env.config()
mongoose.connect(
    `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@cluster0.7ml6ely.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
    }
    ).then(()=>{
        console.log('db connected')
    }).catch((error)=>{
        console.log(error)
    });

app.use(express.json())
app.use('/api',userRoutes)
app.use('/api',catrouter)
app.use('/api/',prodrouter)

app.listen(port,()=>{     
    console.log('listening to this port',port )
 })