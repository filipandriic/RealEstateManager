"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characteristic_controller_1 = require("../controllers/characteristic.controller");
const characteristics_router = express_1.default.Router();
characteristics_router.route('/getAllCharacteristics').get((req, res) => new characteristic_controller_1.CharacteristicController().get_all_characteristics(req, res));
exports.default = characteristics_router;
//# sourceMappingURL=characteristics.routes.js.map