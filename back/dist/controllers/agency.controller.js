"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.add_agency = (req, res) => {
            let agency = new agency_1.default(req.body);
            agency_1.default.findOne({ 'PIB': req.body.PIB }, (err, exists) => {
                if (err)
                    console.log(err);
                else {
                    if (exists == null)
                        agency.save().then(agency => {
                            res.status(200).json({ 'message': 'Agency added.' });
                        }).catch(err => {
                            res.status(400).json({ 'message': 'Unknown error.' });
                        });
                    else
                        res.json({ 'message': 'PIB already taken.' });
                }
            });
        };
        this.get_all = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.get_one = (req, res) => {
            agency_1.default.findOne({ 'name': req.body.name }, (err, agency) => {
                if (err)
                    console.log(err);
                else
                    res.json(agency);
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map