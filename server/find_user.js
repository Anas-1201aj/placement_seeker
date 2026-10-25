import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const findUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const user = await User.findOne({ userName: 'anas_recruiter' });
        if (user) {
            console.log('User found:', {
                id: user._id,
                userName: user.userName,
                role: user.role,
                company_id: user.company_id
            });
        } else {
            console.log('User anas_recruiter not found');
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

findUser();
