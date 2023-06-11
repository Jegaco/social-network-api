const {User} = require('../models');

const userController = {
    async getAllUsers (req, res) {
        try {
            const userData = await User.find();
            res.json(userData);
        } catch(err){
            res.status(500).json(err);
        }
    },

    getUserById (req, res) {
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    updateUser (req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(userData => {
          if (!userData) {
            return res.status(404).json({ message: 'User with this id not found.' });
          }
          res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'User with this id not found.' });
        }
        res.json({ message: 'User deleted successfully' });
        })
        .catch(err => res.status(500).json(err));
    },

   addFriend(req, res){
    User.findOneAndUpdate(
        { 
            _id: req.params.userId 
        },
        { 
            $addToSet: 
                { 
                    friends: req.body.friendId || req.params.friendId
                } 
        },
        { 
            new: true 
        }
      )
        .then(userData => {
          if (!userData) {
            return res.status(404).json({ message: 'Friend with this id not found.' });
          }
          res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteFriend (req, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId 
            },
            { 
                $pull: { friends: params.friendId } 
            },
            { 
                new: true 
            }
          )
            .then((dbUserData) => {
              if (!dbUserData) {
                res.status(404).json({ message: "Friend with this id not found." })
                return;
              }
            })
            .catch((err) => res.status(500).json(err));
    },
}


module.exports = userController;