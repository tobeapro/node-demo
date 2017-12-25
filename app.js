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
app.use('/static', express.static(__dirname + '/node_modules'))
app.use('/public',express.static(__dirname+'/public'))
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
app.post("/music/saveMusic",(req,res)=>{
    var id=req.body.id
    model.findById(id,(err,music)=>{
        if(err){
            res.send({status:500,text:'保存失败'}).end()
        }else{
            if(music){
                res.send({status:204,text:'已存在'}).end()
            }else{
                model.saveMusic(req.body,(err)=>{
                    if(err){
                        res.send({status:500,text:'保存失败'}).end()
                    }else{            
                        res.send({status:200,text:'保存成功'}).end()
                    }
                })
            }
        }
    })
})
app.listen(3000,()=>{
    console.log("listen on localhost:3000")
})