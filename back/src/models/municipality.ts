import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Municipality = new Schema({
    name: {
        type: String
    },
    microlocations: {
        type: Array
    }
})

export default mongoose.model('Municipality', Municipality, 'municipalities');