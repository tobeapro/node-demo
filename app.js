const express=require('express')
const bodyParser=require("body-parser")
const app=express()
// 设置页面文件夹
app.set('views',__dirname+'/views')
// 设置引擎
app.set('view engine','pug')
//引用静态资源
app.use(bodyParser.urlencoded({extented:true}))
app.use('/static', express.static(__dirname + '/public'))
// 匹配路由
app.get('/',(req,res)=>{
    res.render("index",{
        title:'首页',
        list:[{
                "id": 466722,
                "name":"夜的第七章",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/466722.m4a?fromtag=46",
                "lyric":""
                },
                {
                "id":102066257,
                "name":"听妈妈的话",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/102066257.m4a?fromtag=46",
                "lyric":""
                },
                {
                "id":102698215,
                "name":"千里之外",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/102698215.m4a?fromtag=46",
                "lyric":""
                },
                {
                "id":102066448,
                "name":"本草纲目",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/102066448.m4a?fromtag=46",
                "lyric":""
                },
                {
                "id":102066449,
                "name":"退后",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/102066449.m4a?fromtag=46",
                "lyric":""
                },
                {
                "id":101101739,
                "name":"红模仿",
                "singer":"周杰伦",
                "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M000002jLGWe16Tf1H.jpg?max_age=2592000",
                "url":"http://ws.stream.qqmusic.qq.com/101101739.m4a?fromtag=46",
                "lyric":""
                }]
    })
})
app.listen(8080,()=>{
    console.log("listen on localhost:8080")
})