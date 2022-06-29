"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Favourite = new Schema({
    username: {
        type: String
    },
    real_estate: {
        type: JSON
    }
});
exports.default = mongoose_1.default.model('Favourite', Favourite, 'favourites');
//# sourceMappingURL=Favourite.js.map