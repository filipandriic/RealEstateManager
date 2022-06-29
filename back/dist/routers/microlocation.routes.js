"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const microlocation_controller_1 = require("../controllers/microlocation.controller");
const microlocation_router = express_1.default.Router();
microlocation_router.route('/getMicrolocations').get((req, res) => new microlocation_controller_1.MicrolocationController().get_all(req, res));
microlocation_router.route('/addMicrolocation').post((req, res) => new microlocation_controller_1.MicrolocationController().add(req, res));
microlocation_router.route('/pushStreet').post((req, res) => new microlocation_controller_1.MicrolocationController().push_street(req, res));
microlocation_router.route('/removeMicrolocation').post((req, res) => new microlocation_controller_1.MicrolocationController().remove(req, res));
microlocation_router.route('/getMicrolocation').post((req, res) => new microlocation_controller_1.MicrolocationController().get_microlocation(req, res));
exports.default = microlocation_router;
//# sourceMappingURL=microlocation.routes.js.map