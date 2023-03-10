
const { User, Thought, Reaction } = require('../models')

module.exports = {
    //TODO: ROUTE TO GET ALL THOUGHTS
    getAllThoughts(req,res) {
        Thought.find({})
        .then(thoughts => res.json(thoughts))
        .catch((err) => res.status(400).json(err));
    },
    getSingleThought(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select(("-__v"))
        .then((thought) =>
        !thought 
            ? res.status(404).json({message: "No thought found with this id"}) 
            : res.json(thought)
        )
        .catch((err) => res.status(400).json(err));
    },
    createThought(req,res) {
        Thought.create(req.body)
        .then((_id) => {
            return User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((thought) => 
        !thought
            ? res.status(404).json({message: "No User find with this ID!"})
            : res.json(thought)
        )
        .catch((err) => {
        console.log(err); 
        res.status(400).json(err)
        });
    },
    updateThought(req,res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
            ? res.status(404).json({message: "No thought found with this id"})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    deleteThought(req,res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) =>
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
        .catch((err) => res.status(400).json(err));
    },
    addReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
        )
        
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "No thought found with this id"})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json({message: err}));
    },
    deleteReaction(req,res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
        
        .then((thought) =>
        !thought
            ? res.status(404).json({message: "No thought found with this id"})
            : res.json('Reaction deleted')
        )
        .catch((err) => res.status(500).json({message: err}));
    }
};
