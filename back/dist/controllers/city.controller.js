"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityController = void 0;
const city_1 = __importDefault(require("../models/city"));
class CityController {
    constructor() {
        this.get_all_cities = (req, res) => {
            city_1.default.find({}, (err, c) => {
                if (err)
                    console.log(err);
                else
                    res.json(c);
            });
        };
        this.get_city = (req, res) => {
            city_1.default.findOne({ 'name': req.body.name }, (err, c) => {
                if (err)
                    console.log(err);
                else
                    res.json(c);
            });
        };
    }
}
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map