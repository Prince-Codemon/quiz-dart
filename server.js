const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
const cookieparser =require('cookie-parser')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 5000
require('../backend/Config/db')
app.use(cookieparser())
app.use(cors({
    origin:process.env.origin || "http://localhost:3000",
    credentials:true,
    allowedHeaders:['Content-Type','Authorization','Accept','Origin','X-Requested-With','Access-Control-Allow-Origin','Access-Control-Allow-Credentials', 'cookie'],
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
}))
const router = require('../backend/routes')
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname , '/frontend/build')));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend", "build","index.html"))
  })
}
else{
    app.get("/",(req,res)=>{
        res.send('hello world')
    })
}

app.use(router)



app.listen(PORT,()=>console.log('Listening ON PORT ', PORT))