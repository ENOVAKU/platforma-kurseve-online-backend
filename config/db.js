const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

// config.js
export const config = {
    baseUrl: 'http://localhost:5000',
    token: '', // Lëre bosh, do të popullohet pas kyçjes
    userId: '', // Lëre bosh, do të ruhet pas regjistrimit
    courseId: '' // Lëre bosh, do të ruhet pas krijimit të kursit
};