import JobStatus from "../../models/JobStatus.js";

const DEFAULT_JOB_STATUSES = [
  { jobStatus: "Open", jobStep: "1" },
  { jobStatus: "In Progress", jobStep: "2" },
  { jobStatus: "On Hold", jobStep: "3" },
  { jobStatus: "Closed", jobStep: "4" }
];

const getJobStatuses = async (req, res) => {
  try {
    // Default values for page & limit
    let { page = 1, limit = 10, search = "" } = req.query;
    const company_id = req.headers.company_id || req.headers.Company_id;
    // Convert page & limit to numbers
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    // Build a query for searching job statuses
    let query = {};

    if (company_id && company_id !== "undefined" && company_id !== "null") {
      query = {
        $or: [
          { company_id: company_id },
          { company_id: { $exists: false } },
          { company_id: null }
        ]
      };
    }

    if (search) {
      const isNumeric = !isNaN(parseInt(search));
      const searchCondition = isNumeric
        ? {
            $or: [
              { jobStep: parseInt(search) },
              { jobStatus: { $regex: search, $options: "i" } }
            ]
          }
        : {
            jobStatus: { $regex: search, $options: "i" }
          };

      if (query.$or) {
        query = {
          $and: [
            { $or: query.$or },
            searchCondition
          ]
        };
      } else {
        query = searchCondition;
      }
    }

    // Count total documents that match the query
    let totalCount = await JobStatus.countDocuments(query);

    // Auto-seed default job statuses if none exist for this company or system
    if (totalCount === 0 && !search) {
      const targetCompanyId = (company_id && company_id !== "undefined" && company_id !== "null") ? company_id : null;
      const seedDocs = DEFAULT_JOB_STATUSES.map((status) => ({
        ...status,
        ...(targetCompanyId ? { company_id: targetCompanyId } : {})
      }));

      await JobStatus.insertMany(seedDocs);

      // Re-query after auto-seeding
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
      totalCount = await JobStatus.countDocuments(query);
    }

    // Find Job statuses with pagination and search
    const jobStatuses = await JobStatus.find(query)
      .sort({ jobStep: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Send back job statuses array and totalCount
    res.status(200).json({
      jobStatuses,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit) || 1,
    });
  } catch (error) {
    console.error("Error getting job Status:", error);
    res.status(500).json({ message: "Failed to get job status" });
  }
};

export { getJobStatuses };