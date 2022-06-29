"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nalog_controller_1 = require("../controllers/nalog.controller");
const nalogRouter = express_1.default.Router();
nalogRouter.route('/getNalozi').get((req, res) => new nalog_controller_1.NalogController().get_by_username(req, res));
nalogRouter.route('/addNalog').post((req, res) => new nalog_controller_1.NalogController().add_nalog(req, res));
exports.default = nalogRouter;
//# sourceMappingURL=nalog.routes.js.map