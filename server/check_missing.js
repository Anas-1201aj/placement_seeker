import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobStatus from './models/JobStatus.js';
import Recruiter from './models/Recruiter.js';
import Interview from './models/Interview.js';

dotenv.config();

const checkData = async () => {
    const companyId = '6a36408efd1c49e16a7eb4e1';
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        
        const statuses = await JobStatus.find({ company_id: companyId });
        const recruiters = await Recruiter.find({ company_id: companyId });
        const interviews = await Interview.find({ company_id: companyId });
        
        console.log(`Company ID: ${companyId}`);
        console.log(`Job Statuses found: ${statuses.length}`);
        console.log(`Recruiters found: ${recruiters.length}`);
        console.log(`Interviews found: ${interviews.length}`);
        
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

checkData();
