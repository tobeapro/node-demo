var mongoose=require("mongoose")
var musicSchema=new mongoose.Schema({
    id:Number,
    name:String,
    singer:String,
    img:String,
    url:String,
    lyric:String
})
module.exports=musicSchema