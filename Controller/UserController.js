const AuthModel = require('../Model/AuthModel');
const {TestModel, getUserResultsByUserId} = require('../Model/UserModel');

// CREATE - Foydalanuvchi qo'shish
const createUser = async (req, res) => {
  try {
    const newUser = await AuthModel.create(req.body);
   
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// READ - Barcha foydalanuvchilarni olish
const getUsers = async (req, res) => {
  try {
    const users = await AuthModel.find();
    if(!users){
        res.status(404).send(`foydalanuvchilar topilmadi`)
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getJavobId = async (req, res) => {
  try {
    const { userId } = req.params;
    // getUserResultsByUserId funksiyasini ishlatish
    const userResults = await getUserResultsByUserId(userId);
    // Agar foydalanuvchi topilmagan bo'lsa 404 qaytarib chiqamiz
    if (!userResults) {
      return res.status(404).send(`Bunday foydalanuvchi topilmadi`);
    }
    // Foydalanuvchi topilsa, uni 200 status kodi bilan JSON shaklida qaytarib beramiz
    res.status(200).json(userResults);
  } catch (error) {
    // Agar xato yuz berib qolsa, 500 status kodi bilan xato haqida xabar qaytarib beramiz
    res.status(500).json({ error: error.message });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getUserId = async (req, res) => {
    try {
      const { id } = req.params;
      // Mongoose to'g'ri ID ni olish uchun findById funksiyasini ishlatamiz
      const user = await AuthModel.findById(id);
      // Agar foydalanuvchi topilmagan bo'lsa 404 qaytarib chiqamiz
      if (!user) {
        return res.status(404).send(`Bunday foydalanuvchi topilmadi`);
      }
      // Foydalanuvchi topilsa, uni 200 status kodi bilan JSON shaklida qaytarib beramiz
      res.status(200).json(user);
    } catch (error) {
      // Agar xato yuz berib qolsa, 500 status kodi bilan xato haqida xabar qaytarib beramiz
      res.status(500).json({ error: error.message });
    }
  };
  
  

// UPDATE - Foydalanuvchi ma'lumotlarini yangilash
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await AuthModel.findByIdAndUpdate(id, req.body, { new: true });
    if(!updatedUser){
        res.status(404).send(` bunday ${id} foydalanuvchilar topilmadi`)
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Foydalanuvchi o'chirish
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = '66368c1c67274a7f25ec046f';
    
    // Check if the user is attempting to delete the admin user
    if (!id || id === isAdmin) {
        return res.status(403).send(`Admin foydalanuvchini o'chirish mumkin emas.`);
        // You can use 403 Forbidden status code to indicate that the action is forbidden
    }

    // Otherwise, proceed with user deletion
    await AuthModel.findByIdAndDelete(id);
    res.status(204).send('foydalanuvchi o`chirildi');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserId,
  getJavobId
};

