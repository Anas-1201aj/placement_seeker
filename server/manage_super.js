import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const manageSuperAdmin = async () => {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('Usage: node manage_super.js <email> <newPassword> [newName]');
        process.exit(1);
    }

    const [email, newPassword, newName] = args;

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to DB');

        let superUser = await User.findOne({ role: 'super' });

        if (superUser) {
            console.log('Existing Super Admin found. Updating...');
            superUser.email = email;
            if (newPassword) {
                const salt = bcrypt.genSaltSync(10);
                superUser.password = bcrypt.hashSync(newPassword, salt);
            }
            if (newName) superUser.userName = newName;
            
            // Ensure company_id is undefined for super admin
            superUser.company_id = undefined;

            await superUser.save();
            console.log('Super Admin updated successfully!');
        } else {
            console.log('No Super Admin found. Creating new one...');
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);
            
            const newSuper = new User({
                userName: newName || 'Super Admin',
                email: email,
                password: hashedPassword,
                role: 'super',
                gender: 'Other',
                company_id: undefined
            });

            await newSuper.save();
            console.log('New Super Admin created successfully!');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
};

manageSuperAdmin();
