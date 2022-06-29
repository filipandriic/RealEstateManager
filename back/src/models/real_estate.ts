import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Real_estate = new Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    municipality: {
        type: String
    },
    microlocation: {
        type: String
    },
    street: {
        type: String
    },
    area: {
        type: Number
    },
    rooms: {
        type: Number
    },
    construction_year: {
        type: Number
    },
    state: {
        type: String
    },
    heating: {
        type: String
    },
    floor: {
        type: Number
    },
    total_floors: {
        type: Number
    },
    parking: {
        type: String
    },
    monthly_utilities: {
        type: Number
    },
    price: {
        type: Number
    },
    about: {
        type: String
    },
    characteristics: {
        type: Array
    },
    images: {
        type: Array
    },
    advertiser: {
        type: String
    },
    agency: {
        type: String
    },
    sold: {
        type: Number
    },
    last_updated: {
        type: Date
    },
    bus_lines: {
        type: Array
    }
})

export default mongoose.model('Real_estate', Real_estate, 'real_estates');