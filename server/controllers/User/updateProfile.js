// //  const isPasswordValid = await bcrypt.compare( password, user.password );

// //     if ( !isPasswordValid ) {
// //       return res.status( 400 ).json( { error: 'Invalid password' } );
// //     }




// // controllers/User/updateUser.js

// import User from '../../models/User.js';
// import bcrypt from 'bcryptjs'

// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userName, email, password, gender, address, role } = req.body;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // Update only if the field is provided, else keep existing
//     if (userName !== undefined) user.userName = userName;
//     if (email !== undefined) user.email = email;
//     if (password !== undefined) user.password = await bcrypt.hashSync(password, 10);
//     if (gender !== undefined) user.gender = gender;
//     if (address !== undefined) user.address = address;
//     if (role !== undefined) user.role = role;

//     await user.save();

//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export { updateUser };

