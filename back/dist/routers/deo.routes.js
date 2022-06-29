"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deo_controller_1 = require("../controllers/deo.controller");
const deoRouter = express_1.default.Router();
deoRouter.route('/getDelovi').get((req, res) => new deo_controller_1.DeoController().get_all(req, res));
exports.default = deoRouter;
//# sourceMappingURL=deo.routes.js.map