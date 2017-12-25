var mongoose=require("mongoose")
var musicSchema=require("./schema")
var musicModel=mongoose.model("music",musicSchema)
var musicApi={
    getList(res){
        musicModel.find({}).exec(res)
    },
    findById(id,res){
        musicModel.findOne({id:id}).exec(res)
    },
    saveMusic(music,res){   
        musicModel(music).save(function(err,res){
            if(err){
                return console.log(err);
            }
            return 
        })
    }
}
module.exports=musicApi
