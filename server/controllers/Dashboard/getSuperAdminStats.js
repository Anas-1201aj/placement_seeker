import Company from "../../models/company.js";
import Job from "../../models/Job.js";
import User from "../../models/User.js";
import Application from "../../models/Application.js";

const getSuperAdminStats = async (req, res) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Get recent companies and users
    const recentCompanies = await Company.find().sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    // Get jobs by company (top 5)
    const companyStats = await Job.aggregate([
      { $group: { _id: "$company_id", jobCount: { $sum: 1 } } },
      { $sort: { jobCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "companies", // Must match the collection name for Company model
          localField: "_id",
          foreignField: "_id",
          as: "companyInfo"
        }
      },
      { $unwind: { path: "$companyInfo", preserveNullAndEmptyArrays: true } }
    ]);

    res.status(200).json({
      totalCompanies,
      totalJobs,
      totalUsers,
      totalApplications,
      recentCompanies,
      recentUsers,
      companyStats: companyStats.map(stat => ({
        companyName: stat.companyInfo?.companyName || "Unknown",
        jobCount: stat.jobCount
      }))
    });
  } catch (error) {
    console.error("Error fetching super admin stats:", error);
    res.status(500).json({ message: error.message });
  }
};

export { getSuperAdminStats };
