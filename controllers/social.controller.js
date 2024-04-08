import Person from "../models/personSchema.js";
import User from "../models/userSchema.js";
import Team from '../models/teamSchema.js'
const socialController = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const skip = (page - 1) * limit;
  
    const totalSize = await Person.countDocuments({});
    const person = await Person.find({})
      .skip(skip)
      .limit(limit);
  
    const totalPages = Math.ceil(totalSize / limit);
  
    return res.json({
      person,
      currentPage: page,
      totalPages,
      totalSize,
    });
  };

export const getTeams = async(req,res)=>{
    const {userId,email} = req;
    try{
        const userTeam = await Team.find({creator: userId})
        let toGiveData = [];
        const teamMembers = userTeam.members;
        for(const mem of teamMembers){
            const user = await User.findOne({_id : mem})
            toGiveData.push(user);
        }
        console.log(toGiveData)
        return res.json({success: true, toGiveData, message: 'Team members List'})
    } catch(e){
        return res.json({success: false, messag: 'Some Internal Error Occured'})
    }
}

export const addTeamMember = async (req,res)=>{
    const { selectedId } = req.body;
    const { userId } = req;
    const teamMembers = await Team.find({creator : userId})
    let allMember;
    for(const mem of teamMembers){
        
    }
}

export default socialController;