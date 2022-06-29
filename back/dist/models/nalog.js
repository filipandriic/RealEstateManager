"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nalog = new Schema({
    id: {
        type: Number
    },
    serviser: {
        type: String
    },
    naziv: {
        type: String
    },
    deo: {
        type: String
    },
    status: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Nalog', Nalog, 'nalozi');
//# sourceMappingURL=nalog.js.map