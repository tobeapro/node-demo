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
musicSchema.statics={
    getList (res){
        this.find({}).exec(res)
    },
    findById(id,res){
        this.findOne({id:id}).exec(res)
    }
}