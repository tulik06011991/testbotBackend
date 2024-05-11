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


// console.log(__dirname)


const app = express();
app.use(express.json());
app.use(cors(
  {
      origin: "http://localhost:5173" || "https://testbotbackend-8.onrender.com",
      credentials: true
  }
))



app.use('/auth', auth);
app.use('/questions', adminQueistion)
app.use('/test', testUser);
app.use('/foydalanuvchi', users);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://testbotfrontend-2.onrender.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.use(express.static(path.join(__dirname, '/frontend/dist')))

// app.get('*', (req, res) =>res.sendFile(__dirname, '/frontend/dist/index.html'))
app.get("/" , (req, res) =>{
  res.send('hello')
})
MONGO_URL = 'mongodb+srv://tolqinmirsaliyev:baliq06011991@cluster0.3ewxg9n.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_URL)
  .then(() => console.log('MongoDBga muvaffaqiyatli ulanish'))
  .catch((error) => console.error('MongoDBga ulanishda xatolik:', error));

PORT = process.env.PORT

app.listen(PORT, () => console.log('Server 3000 portda eshitishni boshladi'));
