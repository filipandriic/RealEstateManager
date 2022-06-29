import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    city: {
        type: String
    },
    birthday: {
        type: Date
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    agency: {
        type: String
    },
    license: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    }
})

export default mongoose.model('User', User, 'users');