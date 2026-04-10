import Interview from '../../models/Interview.js';


const updateInterviewByCandidate = async (req, res) => {
  try {
    const { interviewId, candidateID, status } = req.body;

    // Find the job by jobId
    console.log("Update Interview by candidate");
    console.log(req.body);

    const updatedInterview = await Interview.findByIdAndUpdate(
      candidateID,
      { $push: { applications: { interviewId: interviewId, candidateID: candidateID, status: status } } },
      { new: true } // To return the updated document
    );

    if (!updatedInterview) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(updatedInterview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job by candidate' });
  }
}

export { updateInterviewByCandidate };