const {User, Thought , Reaction} = require('../models');

const thoughtController = {
    async getAllThoughts (req, res) {
        try {
            const thoughtData = await Thought.find({});
            res.json(thoughtData);
        } catch(err){
            res.status(500).json(err);
        }
    },

    async getThoughtsById (req, res) {
        try{
            const thought = await Thought.find({_id: req.params.id})
            if(!thought){
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(thought);
        } catch(err) {
            res.status(500).json(err)
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async updateThoughtById (req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });

            if(!thought) {
                res.status(404).json({ message: 'No thought found with this id.' }); 
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE /api/thoughts/:id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res){
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { 
                    _id: req.params.thoughtId
                },
                { 
                    $addToSet:{ reactions: req.body}
                },
                { 
                    runValidators: true,
                    new: true,
                });

                newReaction ? res.json(thought) : res.status(404).json({message: 'Thought id does not exist. Unable to react.'});
                return;

        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try {
            const removeReaction = await Thought.findOneAndUpdate(
                { 
                    _id: req.params.thoughtId
                },
                {
                    $pull: 
                        {
                            reactions: 
                            {
                                reactionId: req.params.reactionId
                            }
                        }
                },
                { 
                    runValidators: true,
                    new: true,
                });

                removeReaction ? res.json(thought) : res.status(404).json({message: 'Reaction deleted'});
                return;

        } catch (err) {
            res.status(500).json(err);
        }
    },
}


module.exports = thoughtController;