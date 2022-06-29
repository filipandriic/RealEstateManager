"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Real_estate', Real_estate, 'real_estates');
//# sourceMappingURL=real_estate.js.map