const express = require('express');
const router = express.Router();
const {
    registerUser,
    login,
    addTasks,
    listTasks,
    deleteTask,
    updateTask,
    setRemainder
} = require('../controllers/userController')
const protect = require('../middlewares/auth')


router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/addTasks').post(protect,addTasks)
router.route('/listTasks').get(protect,listTasks)
router.route('/deleteTask/:id').get(protect,deleteTask)
router.route('/updateTask').post(protect,updateTask)
router.route('/setRemainder/:id').put(protect,setRemainder)


module.exports = router;
