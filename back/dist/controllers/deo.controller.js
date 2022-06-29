"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeoController = void 0;
const deo_1 = __importDefault(require("../models/deo"));
class DeoController {
    constructor() {
        this.get_all = (req, res) => {
            deo_1.default.find({}, (err, dell) => {
                if (err)
                    console.log(err);
                else
                    res.json(dell);
            });
        };
    }
}
exports.DeoController = DeoController;
//# sourceMappingURL=deo.controller.js.map