import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkHead = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const user = await User.findOne({ userName: 'anas_recruiter' });
        console.log('User head status:', user.head);
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

checkHead();
