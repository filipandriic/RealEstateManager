import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Characteristic = new Schema({
    name: {
        type: String
    }
})

export default mongoose.model('Characteristic', Characteristic, 'characteristics');