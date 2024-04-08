import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persson'
    }]

},
    {
        timestamps: true
    })

const Team = mongoose.model('Team',teamSchema);
export default Team;