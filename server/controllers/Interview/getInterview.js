import Interview from '../../models/Interview.js';


const getInterview = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const interview = await Interview.findById(interviewId);
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Failed to get interview" });
  }
};

export { getInterview };