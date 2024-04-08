import jwt from 'jsonwebtoken'
const authUser = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(404).json({success: false, message: 'Please signin First'});
    }else{
        const {id,email} = jwt.decode(token,process.env.JWT_SECRET_KEY);
        req.userId = id;
        req.email = email;
    }
}
export default authUser