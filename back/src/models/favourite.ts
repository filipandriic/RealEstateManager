import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Favourite = new Schema({
    username: {
        type: String
    },
    real_estate: {
        type: JSON
    }
})

export default mongoose.model('Favourite', Favourite, 'favourites');