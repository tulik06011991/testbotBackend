const express = require('express');
const router = express.Router()

const {createUser,
    getUsers,
    updateUser,
    deleteUser, getUserId, getJavobId} = require('../Controller/UserController');
    const { verifyAdmin} = require('../VerifyToken/verifyToken')


router.post('/user',  verifyAdmin, createUser );
router.get('/users',  verifyAdmin,  getUsers );
router.get('/user/:id', verifyAdmin,  getUserId );
router.put('/user/:id',  verifyAdmin, updateUser );
router.delete('/user/:id', verifyAdmin, deleteUser );
router.get('/javob/:userId',  verifyAdmin, getJavobId );

module.exports = router