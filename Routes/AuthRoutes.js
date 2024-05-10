const express= require('express')
const router = express.Router()
const {loginUser, registerUser, logout} = require('../Controller/Auth')

router.post("/register" , registerUser );

router.post("/login" , loginUser );
router.get("/logout", logout);





module.exports = router;