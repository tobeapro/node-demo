var mongoose=require("mongoose")
var musicSchema=require("./schema")
var musicModel=mongoose.model("music",musicSchema)
module.exports=musicModel
