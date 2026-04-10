// controllers/User/updateUser.js

import Interview from '../../models/Interview.js';

const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { roundName, roundNumber } = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found',
      });
    }

    // Update only if the field is provided, else keep existing
    if (roundName !== undefined) interview.roundName = roundName;
    if (roundNumber !== undefined) interview.roundNumber = roundNumber;


    await interview.save();

    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { updateInterview };
