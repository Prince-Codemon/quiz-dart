const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
const cookieparser =require('cookie-parser')
require('dotenv').config()
const PORT = process.env.PORT || 5000
require('../backend/Config/db')
app.use(cookieparser())
app.use(cors({
    origin:process.env.origin,
    credentials:true,
    allowedHeaders:['Content-Type','Authorization','Accept','Origin','X-Requested-With','Access-Control-Allow-Origin','Access-Control-Allow-Credentials', 'cookie'],
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
}))
const router = require('../backend/routes')
app.use(bodyparser.json())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

if(process.env.NODE_ENV ==="production"){
    app.use(express.static("frontend/build"))
}


app.listen(PORT,()=>console.log('Listening ON PORT ', PORT))