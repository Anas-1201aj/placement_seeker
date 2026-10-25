import mongoose from 'mongoose';
import dotenv from 'dotenv';
import JobStatus from './models/JobStatus.js';
import Interview from './models/Interview.js';

dotenv.config();

const seedData = async () => {
    const companyId = '6a36408efd1c49e16a7eb4e1'; // Parada
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        
        console.log('Seeding default data for company:', companyId);

        // 1. Seed Job Statuses
        const defaultStatuses = [
            { jobStatus: 'Open', jobStep: '1', company_id: companyId },
            { jobStatus: 'In Progress', jobStep: '2', company_id: companyId },
            { jobStatus: 'On Hold', jobStep: '3', company_id: companyId },
            { jobStatus: 'Closed', jobStep: '4', company_id: companyId }
        ];

        for (const status of defaultStatuses) {
            await JobStatus.findOneAndUpdate(
                { jobStatus: status.jobStatus, company_id: companyId },
                status,
                { upsert: true }
            );
        }
        console.log('Default Job Statuses seeded');

        // 2. Seed Default Interview Round
        const defaultInterviews = [
            { roundName: 'Basic Screening', company_id: companyId },
            { roundName: 'Technical Round', company_id: companyId },
            { roundName: 'HR Round', company_id: companyId }
        ];

        for (const interview of defaultInterviews) {
            await Interview.findOneAndUpdate(
                { roundName: interview.roundName, company_id: companyId },
                interview,
                { upsert: true }
            );
        }
        console.log('Default Interview Rounds seeded');

        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

seedData();
