"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const municipality_controller_1 = require("../controllers/municipality.controller");
const municipality_router = express_1.default.Router();
municipality_router.route('/getMunicipalities').get((req, res) => new municipality_controller_1.MunicipalityController().get_all(req, res));
municipality_router.route('/pushMicrolocation').post((req, res) => new municipality_controller_1.MunicipalityController().push_microlocation(req, res));
municipality_router.route('/pullMicrolocation').post((req, res) => new municipality_controller_1.MunicipalityController().pull_microlocation(req, res));
municipality_router.route('/getMunicipality').post((req, res) => new municipality_controller_1.MunicipalityController().get_municipality(req, res));
exports.default = municipality_router;
//# sourceMappingURL=municipality.routes.js.map