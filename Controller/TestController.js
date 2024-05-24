const Question = require('../Model/TestModel');
const TestModel = require('../Model/UserModel');
console.log(TestModel)


const QuestionGet = async (req, res) => {
  try {
    const questions = await Question.find()// Misol uchun, faqat 10ta savolni olish
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const UserAnswerPost = async (req, res) => {
  try {
    const { userId, questionId, userAnswer } = req.body;

    // Foydalanuvchi test ishlaganini tekshirish
    const userResults = await TestModel.find({ userId });

    // Agar foydalanuvchi allaqachon 30 ta savolga javob berib bo'lsa, 403 HTTP status kodi bilan foydalanuvchiga xabar berish
    if (userResults.length >= 30) {
      return res.status(403).json({ error: 'Siz allaqachon 30 ta savolga javob berdingiz' });
    }

    // Savolni ma'lumotlar bazasidan olish
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Savol topilmadi' });
    }

    // Foydalanuvchi javobini tekshirish
    if (userAnswer === null || userAnswer.length === 0) {
      return res.status(404).json({ error: 'Foydalanuvchi hech bir variantni tanlamagan' });
    }

    const isCorrect = userAnswer === question.correctAnswer;

    // Natijani saqlash
    await TestModel.create({
      userId,
      questionId,
      userAnswer,
      correct: isCorrect
    });

    // Asinxron natijalarni hisoblash
    process.nextTick(async () => {
      try {
        const allResults = await TestModel.find({ userId });
        const correctCount = allResults.filter(result => result.correct).length;
        const userScore = (correctCount / allResults.length) * 100;

        // Yangilangan natijalarni saqlash yoki qaytarish lozim bo'lsa
        console.log({ totalQuestions: allResults.length, correctCount, userScore });
      } catch (error) {
        console.error('Xatolik:', error);
      }
    });

    res.status(200).json({ message: 'Javob qabul qilindi' });
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({ error: error.message });
  }
};






// Barcha ma'lumotlarni o'chirish
const deleteAnswers =  (req, res) => {
  TestModel.deleteMany({})
    .then(() => {
      console.log('Barcha ma\'lumotlar muvaffaqiyatli o\'chirildi');
      res.status(200).json({ message: 'Barcha ma\'lumotlar muvaffaqiyatli o\'chirildi' });
    })
    .catch((err) => {
      console.error('Ma\'lumotlarni o\'chirishda xatolik:', err);
      res.status(500).json({ error: 'Server xatosi, ma\'lumotlar o\'chirilmadi' });
    });
};


const deleteQuestions =  (req, res) => {
  Question.deleteMany({})
    .then(() => {
      console.log('Barcha ma\'lumotlar muvaffaqiyatli o\'chirildi');
      res.status(200).json({ message: 'Barcha ma\'lumotlar muvaffaqiyatli o\'chirildi' });
    })
    .catch((err) => {
      console.error('Ma\'lumotlarni o\'chirishda xatolik:', err);
      res.status(500).json({ error: 'Server xatosi, ma\'lumotlar o\'chirilmadi' });
    });
};

const deleteAnswersId = (req, res) => {
  const userId = req.params.id; // Foydalanuvchi identifikatori
  TestModel.deleteMany({ userId: userId }) // userId bo'yicha javoblarni o'chiramiz
    .then(() => {
      console.log(`Foydalanuvchi ${userId} javoblari muvaffaqiyatli o'chirildi`);
      res.status(200).json({ message: `Foydalanuvchi ${userId} javoblari muvaffaqiyatli o'chirildi` });
    })
    .catch((err) => {
      console.error('Javoblarni o\'chirishda xatolik:', err);
      res.status(500).json({ error: 'Server xatosi, javoblarni o\'chirish muvaffaqiyatli o\'chirilmadi' });
    });
};




module.exports = {
  QuestionGet,
  UserAnswerPost,
  deleteAnswers,
  deleteQuestions,
  deleteAnswersId
};