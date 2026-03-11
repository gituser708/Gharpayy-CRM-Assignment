const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log(`MongoDB Connected To: ${res.connection.name}`)
        });
    } catch (error) {
        console.error(error);
    };
};

module.exports = connectDB;