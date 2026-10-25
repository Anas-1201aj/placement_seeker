import Interview from '../../models/Interview.js';
import Company from '../../models/company.js';

const DEFAULT_INTERVIEW_ROUNDS = [
  { roundName: 'Basic Screening' },
  { roundName: 'Technical Round' },
  { roundName: 'HR Round' },
  { roundName: 'AI Screening' }
];

const getInterviews = async (req, res) => {
  try {
    // Default values for page & limit
    let { page = 1, limit = 10, search = '' } = req.query;
    const company_id = req.headers.company_id || req.headers.Company_id;

    // Convert page & limit to numbers (ensure valid numbers)
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // Build a query for searching roundName or roundNumber
    let query = {};

    if (company_id && company_id !== "undefined" && company_id !== "null") {
      query = {
        $or: [
          { company_id: company_id },
          { company_id: { $exists: false } },
          { company_id: null }
        ]
      };

      const company = await Company.findById(company_id).catch(() => null);
      if (company && company.onlyAiFeaturesEnabled) {
        query.roundName = { $regex: 'AI', $options: 'i' };
      }
    }

    if (search) {
      const searchCondition = {
        $or: [
          { roundName: { $regex: search, $options: 'i' } },
          { roundNumber: { $regex: search, $options: 'i' } },
        ]
      };
      if (query.$or) {
        query = {
          $and: [{ $or: query.$or }, searchCondition]
        };
      } else {
        query = searchCondition;
      }
    }

    // Count total documents that match the query
    let totalCount = await Interview.countDocuments(query);

    // Auto-seed default interview rounds if none exist for this company or system
    if (totalCount === 0 && !search) {
      const targetCompanyId = (company_id && company_id !== "undefined" && company_id !== "null") ? company_id : null;
      const seedDocs = DEFAULT_INTERVIEW_ROUNDS.map((round) => ({
        ...round,
        ...(targetCompanyId ? { company_id: targetCompanyId } : {})
      }));

      await Interview.insertMany(seedDocs);

      if (targetCompanyId) {
        query = {
          $or: [
            { company_id: targetCompanyId },
            { company_id: { $exists: false } },
            { company_id: null }
          ]
        };
      } else {
        query = {};
      }
      totalCount = await Interview.countDocuments(query);
    }

    // Find interviews with pagination and search
    const interviews = await Interview.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    // Send back interviews array and totalCount
    res.status(200).json({
      interviews,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit) || 1
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Failed to get interviews' });
  }
};

export { getInterviews };
