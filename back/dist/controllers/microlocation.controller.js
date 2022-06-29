"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrolocationController = void 0;
const microlocation_1 = __importDefault(require("../models/microlocation"));
class MicrolocationController {
    constructor() {
        this.get_all = (req, res) => {
            microlocation_1.default.find({}, (err, c) => {
                if (err)
                    console.log(err);
                else
                    res.json(c);
            });
        };
        this.add = (req, res) => {
            let micro = new microlocation_1.default(req.body);
            microlocation_1.default.findOne({ 'name': req.body.name }, (err, exists) => {
                if (err)
                    console.log(err);
                else {
                    if (exists == null)
                        micro.save().then(micro => {
                            res.status(200).json({ 'message': 'Microlocation added.' });
                        }).catch(err => {
                            res.status(400).json({ 'message': 'Unknown error.' });
                        });
                    else
                        res.json({ 'message': 'Microlocation already exists.' });
                }
            });
        };
        this.push_street = (req, res) => {
            microlocation_1.default.collection.updateOne({ 'name': req.body.name }, { $push: { 'streets': req.body.street } }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Microlocation updated' });
            });
        };
        this.remove = (req, res) => {
            microlocation_1.default.collection.deleteOne({ 'name': req.body.name }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Microlocation removed' });
            });
        };
        this.get_microlocation = (req, res) => {
            microlocation_1.default.findOne({ 'name': req.body.name }, (err, c) => {
                if (err)
                    console.log(err);
                else
                    res.json(c);
            });
        };
    }
}
exports.MicrolocationController = MicrolocationController;
//# sourceMappingURL=microlocation.controller.js.map