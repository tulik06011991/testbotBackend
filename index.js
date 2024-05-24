// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const auth = require('./Routes/AuthRoutes');
const adminQueistion = require('./Routes/AdminRoutes');
const testUser = require('./Routes/TestRoutes')
const users = require('./Routes/UserRoutes')
const path = require('path')


const app = express();



app.use(express.json());

app.use(cors({
  origin: 'https://mirsaliyev-tulqin08.netlify.app',
  credentials: true
}));




app.use('/auth', auth);
app.use('/questions', adminQueistion)
app.use('/test', testUser);
app.use('/foydalanuvchi', users);





app.get("/" , (req, res) =>{
  res.send('hello')
})
MONGO_URL = 'mongodb+srv://tolqinmirsaliyev:baliq06011991@cluster0.3ewxg9n.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_URL)



mongoose.connect(process.env.MONGO_URL)

  .then(() => console.log('MongoDBga muvaffaqiyatli ulanish'))
  .catch((error) => console.error('MongoDBga ulanishda xatolik:', error));

PORT = process.env.PORT

app.listen(PORT, () => console.log('Server 3000 portda eshitishni boshladi'));
