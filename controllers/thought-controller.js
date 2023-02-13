
const { Thought, Reaction, User} = require('../../models')

module.exports = {
    //TODO: ROUTE TO GET ALL THOUGHTS
    async getAllThoughts(req,res) {
        try {
        const thoughts = await Thought.find()
        res.status(200).json(thoughts)
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async getSingleThought(req,res) {
        try {
        const thought = await Thought.findOne({_id: req.params.thoughtId})
        .then(() =>
        !thought 
            ? res.status(404).json({message: "No thought found with this id"}) 
            : res.json(thought))
        } catch (err) {
        res.status(400).json(err);
        }
    },
    
    async createThought(req,res) {
        try {
        const thought = await Thought.create(req.body)
        await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: {thoughts: thought._id}},
                {new: true}
            )
        res.status(200).json(thought)
        
        } catch (err) {
        console.log(err); 
        res.status(400).json(err)
        };
    },
    
    async updateThought(req,res) {
        try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: req.body},
            {runValidators: true, new: true}
        )
        .then(() =>
        !thought
            ? res.status(404).json({message: "No thought found with this id"})
            : res.json(thought)
        )
        } catch (err) {
        console.log(err);
        res.status(400).json(err);
        };
    },

    async deleteThought(req,res) {
        try {
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(() =>
        !thought
            ? res.status(404).json({message: "No thought found with this id"})
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId},
                { $pull: { thoughts: req.params.thoughtId}},
                { new: true}
            )
        )
        .then((user) =>
        !user
            ? res.status(404).json({message: "Thought deleted, but no user found with this id"})
            : res.json('Deleted thought')
        )
            } catch (err) {
            res.status(400).json(err);
    }
    },
    async addReaction(req,res) {
        try { 
        const reaction = await Reaction.create(req.body)
        .then(() => {
            return Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        })
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "No thought found with this id"})
            : res.json(thought)
        )
    } catch (err) { 
        res.status(500).json({message: err});
    }
    },
    async deleteReaction(req,res) {
        try {
        const reaction = await Reaction.findOneAndDelete({_id: req.params.reactionId})
        .then(() => {
            return Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        })
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "No thought found with this id"})
            : res.json(thought)
        )
    } catch (err) {
        res.status(500).json({message: err});
    }
    }
};
