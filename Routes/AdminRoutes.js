const express = require('express');
const router = express.Router();

const {
    adminSavollarGet,
    adminSavollarPost, getUsersInfo
} = require('../Controller/AdminController');
const { verifyAdmin} = require('../VerifyToken/verifyToken')


router.get("/adminGet", verifyAdmin,  adminSavollarGet);
router.get("/adminInfoUser",  verifyAdmin,     getUsersInfo);
router.post('/adminPost',   adminSavollarPost);

module.exports = router