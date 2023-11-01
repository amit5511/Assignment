const monoose =require('mongoose');

const chatSchema = new monoose.Schema({
    query:{
        type:String,
        require:true
    },
    result:{
        type:String,
        require:true
    }
},{
    timestamp: true
}
)

const chatModel = new monoose.model('chatModel',chatSchema)
module.exports=chatModel