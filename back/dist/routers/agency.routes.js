"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const agency_router = express_1.default.Router();
agency_router.route('/addAgency').post((req, res) => new agency_controller_1.AgencyController().add_agency(req, res));
agency_router.route('/getAgencies').get((req, res) => new agency_controller_1.AgencyController().get_all(req, res));
agency_router.route('/getAgency').post((req, res) => new agency_controller_1.AgencyController().get_one(req, res));
exports.default = agency_router;
//# sourceMappingURL=agency.routes.js.map