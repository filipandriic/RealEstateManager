"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("../controllers/city.controller");
const city_router = express_1.default.Router();
city_router.route('/getCities').get((req, res) => new city_controller_1.CityController().get_all_cities(req, res));
city_router.route('/getCity').post((req, res) => new city_controller_1.CityController().get_city(req, res));
exports.default = city_router;
//# sourceMappingURL=city.routes.js.map