import User from '../models/userSchema.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Some Fields are missing' })
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User Exists with given credentials' })
    } else {
        const salt = await bcryptjs.genSalt(10);
        const epassword = await bcryptjs.hash(password, salt);
        try {
            const newUser = await User.create({ name: name, email: email, password: epassword });
            return res.status(201).json({ success: true, newUser, message: 'User Created Successfully' });

        } catch (e) {
            return res.status(500).json({ success: false, message: e.message })
        }
    }
}

export const signInUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Some Fields are missing' });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'No such User exists' });
        }

        const passwordCompare = await bcryptjs.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET_KEY);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
        });
        return res.status(200).json({ success: true, message: 'Authentication successful', user });

    } catch (e) {
        return res.status(500).json({ success: false, message: 'Some Internal Error Occured', es: e.message })
    }
}

export const refreshUser = async (req, res) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({success: false, message: 'Unauthorized User of missing Cookies'})
    }
    const { id, email } = jwt.decode(token, process.env.JWT_SECRET_KEY);
    try {
        const user = await User.findOne({email : email}).select('-password');
        if(!user) {
            return res.json({success: false, message : 'Unauthorized'});
        } else{
            return res.status(200).json({success: true, message : 'Login Successful', user})
        }
    } catch(e){
        return res.status(500).json({success: false, message : e.message});
    }

}

export const logoutUser = async (req, res) => {
    try {
      // Invalidate the token on the server-side
      console.log('Logout Called')
      res.clearCookie('token');
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error logging out' });
    }
  };