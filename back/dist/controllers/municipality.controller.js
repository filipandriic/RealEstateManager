"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityController = void 0;
const municipality_1 = __importDefault(require("../models/municipality"));
class MunicipalityController {
    constructor() {
        this.get_all = (req, res) => {
            municipality_1.default.find({}, (err, c) => {
                if (err)
                    console.log(err);
                else
                    res.json(c);
            });
        };
        this.push_microlocation = (req, res) => {
            municipality_1.default.collection.updateOne({ 'name': req.body.name }, { $push: { 'microlocations': req.body.microlocation } }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Municipality updated' });
            });
        };
        this.pull_microlocation = (req, res) => {
            municipality_1.default.collection.updateMany({}, { $pull: { 'microlocations': req.body.microlocation } }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Municipality updated' });
            });
        };
        this.get_municipality = (req, res) => {
            municipality_1.default.findOne({ 'name': req.body.name }, (err, c) => {
                if (err)
                    console.log(err);
                else
                    res.json(c);
            });
        };
    }
}
exports.MunicipalityController = MunicipalityController;
//# sourceMappingURL=municipality.controller.js.map