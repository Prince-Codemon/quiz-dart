const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,
   {useNewUrlParser:true}).then(()=>{
console.log('Connection Successful')
}).catch((e)=>{
 console.log(e)
})