import mongoose from 'mongoose';


const personSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true,
        trim: true
    },
    last_name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    available : {
        type: Boolean,
        default: false
    },
    gender : {
        type: String,
        default : "male"
    },
    domain : {
        type: String
    },
    avatar : {
        type: String
    }
})

const Person = mongoose.model('Person', personSchema);
export default Person;