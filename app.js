const express=require('express')
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const model=require("./servers/index")
const app=express()
mongoose.connect('mongodb://localhost/player')
var db=mongoose.connection
db.on('error',()=>{
    console.log("database connect error")
})
db.once('open',()=>{
    console.log("database connect success")
})
// 设置页面文件夹
app.set('views',__dirname+'/views')
// 设置引擎
app.set('view engine','pug')
//引用静态资源
app.use(bodyParser.urlencoded({extented:true}))
app.use('/static', express.static(__dirname + '/public'))
// 匹配路由
app.get('/',(req,res)=>{
    model.getList((err,list)=>{
        if(err){
            console.log(err)
        }
        res.render('index',{
          title:'首页-歌曲列表',
          list:list
        })
    })
})
app.get("/music/:id",(req,res)=>{
    let id=req.params.id
    model.findById(id,(err,music)=>{
        res.render('detail',{
            title:'歌曲-'+music.name,
            music:music
        })
    })
})
app.listen(3000,()=>{
    console.log("listen on localhost:3000")
})