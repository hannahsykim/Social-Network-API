
const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;

// const {User} = require("../../models")

// //TODO - ROUTE THAT GETS ALL THE USERS, include friends?
// router.get('/', (req,res)=> {

// })

// //TODO - ROUTE THAT CREATES A NEW USER
// router.post('/', (req,res)=> {

// });

// //TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
// router.get('/:userId', (req,res) => {

// })

// //TODO - ROUTE THAT UPDATES A SINGLE USER
// router.put('/:userId', (req,res)=> {

// })

// //TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
// router.delete('/:userId', (req,res)=> {

// });

// //TODO - ROUTE THAT ADDS A FRIEND TO A USER
// router.put('/:userId/friends/:friendId', (req,res)=> {

// })

// //TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
// router.delete('/:userId/friends/:friendId', (req,res)=> {
  
// });

// module.exports = router;
