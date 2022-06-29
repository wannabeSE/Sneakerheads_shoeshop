const express =require('express')
const app= express()
const env =require('dotenv')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const port=8080
const userRoutes=require('./routes/userRouter')
const User=require('./models/user')

env.config()
mongoose.connect(
    'mongodb+srv://samir666:Takashi69@cluster0.7ml6ely.mongodb.net/?retryWrites=true&w=majority',
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

app.listen(port,()=>{
     
    console.log('listening to this port',port )
 })