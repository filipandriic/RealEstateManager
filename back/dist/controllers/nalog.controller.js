"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NalogController = void 0;
const nalog_1 = __importDefault(require("../models/nalog"));
class NalogController {
    constructor() {
        this.get_by_username = (req, res) => {
            let username = req.query.username;
            nalog_1.default.find({ 'serviser': username }, (err, nalozi) => {
                if (err)
                    console.log(err);
                else
                    res.json(nalozi);
            });
        };
        this.add_nalog = (req, res) => {
            let nalog = new nalog_1.default(req.body);
            nalog.save();
            res.json({ 'message': 'ok' });
        };
    }
}
exports.NalogController = NalogController;
//# sourceMappingURL=nalog.controller.js.map