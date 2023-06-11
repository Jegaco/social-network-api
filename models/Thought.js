const { Schema, model, Types } = require('mongoose'); 
const reactionSchema = require('./Reaction');
const Thought = model('Thought',thoughtSchema)

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timeCreated => new Date(timeCreated).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

module.exports = Thought;