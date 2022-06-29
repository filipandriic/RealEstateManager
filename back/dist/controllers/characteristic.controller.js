"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacteristicController = void 0;
const characteristic_1 = __importDefault(require("../models/characteristic"));
class CharacteristicController {
    constructor() {
        this.get_all_characteristics = (req, res) => {
            characteristic_1.default.find({}, (err, characteristics) => {
                if (err)
                    console.log(err);
                else
                    res.json(characteristics);
            });
        };
    }
}
exports.CharacteristicController = CharacteristicController;
//# sourceMappingURL=characteristic.controller.js.map