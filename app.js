const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send("...")
}).listen(8080,()=>{
    console.log("listen on localhost:8080")
})