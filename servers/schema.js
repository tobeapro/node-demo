var mongoose=require("mongoose")
var musicSchema=new mongoose.Schema({
    id:Number,
    name:String,
    singer:String,
    img:String,
    url:String,
    lyric:String
})
musicSchema.statics={
    getList:function(res){
       return this
        .find({})
        .exec(res)
    },
    findById:function(id,res){
        return this
        .findOne({id:id})
        .exec(res)
    }
}
module.exports=musicSchema