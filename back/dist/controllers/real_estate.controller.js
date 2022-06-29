"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const real_estate_1 = __importDefault(require("../models/real_estate"));
const mongodb_1 = require("mongodb");
class RealEstateController {
    constructor() {
        this.add = (req, res) => {
            let real_estate = new real_estate_1.default(req.body);
            real_estate.save().then(real_estate => {
                res.status(200).json({ 'message': 'Real estate added.' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Unknown error.' });
            });
        };
        this.get_all = (req, res) => {
            real_estate_1.default.find({}, (err, real_estates) => {
                if (err)
                    console.log(err);
                else
                    res.json(real_estates);
            });
        };
        this.get_by_username = (req, res) => {
            let advertiser = req.body.username;
            real_estate_1.default.find({ 'advertiser': advertiser }, (err, real_estates) => {
                if (err)
                    console.log(err);
                else
                    res.json(real_estates);
            });
        };
        this.update = (req, res) => {
            let id = new mongodb_1.ObjectId(req.body._id);
            req.body._id = id;
            real_estate_1.default.collection.updateOne({ '_id': id }, { $set: req.body }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Real estate updated' });
            });
        };
        this.sell = (req, res) => {
            let id = new mongodb_1.ObjectId(req.body._id);
            req.body._id = id;
            real_estate_1.default.collection.updateOne({ '_id': id }, { $set: req.body }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Real estate sold' });
            });
        };
        this.get_sold_from_advertiser_by_month = (req, res) => {
            let month = req.body.month;
            let microlocation = req.body.microlocation;
            real_estate_1.default.count({ 'sold': month, 'microlocation': microlocation }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'number': ret });
            });
        };
        this.get_sold_from_agency_by_month = (req, res) => {
            let month = req.body.month;
            let agency = req.body.agency;
            let microlocation = req.body.microlocation;
            real_estate_1.default.count({ 'agency': agency, 'sold': month, 'microlocation': microlocation }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'number': ret });
            });
        };
        this.search = (req, res) => {
            real_estate_1.default.find(req.body, (err, real_estates) => {
                if (err)
                    console.log(err);
                else
                    res.json(real_estates);
            });
        };
        this.get_num_from_microlocation = (req, res) => {
            real_estate_1.default.count({ 'microlocation': req.body.microlocation }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'number': ret });
            });
        };
    }
}
exports.RealEstateController = RealEstateController;
//# sourceMappingURL=real_estate.controller.js.map