"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const real_estate_controller_1 = require("../controllers/real_estate.controller");
const real_estate_router = express_1.default.Router();
real_estate_router.route('/addRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().add(req, res));
real_estate_router.route('/getAll').get((req, res) => new real_estate_controller_1.RealEstateController().get_all(req, res));
real_estate_router.route('/getByAdvertiser').post((req, res) => new real_estate_controller_1.RealEstateController().get_by_username(req, res));
real_estate_router.route('/updateRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().update(req, res));
real_estate_router.route('/sellRealEstate').post((req, res) => new real_estate_controller_1.RealEstateController().sell(req, res));
real_estate_router.route('/getNumRealEstatesAdvertiser').post((req, res) => new real_estate_controller_1.RealEstateController().get_sold_from_advertiser_by_month(req, res));
real_estate_router.route('/getNumRealEstatesAgency').post((req, res) => new real_estate_controller_1.RealEstateController().get_sold_from_agency_by_month(req, res));
real_estate_router.route('/searchRealEstates').post((req, res) => new real_estate_controller_1.RealEstateController().search(req, res));
real_estate_router.route('/getNumRealEstatesMicrolocation').post((req, res) => new real_estate_controller_1.RealEstateController().get_num_from_microlocation(req, res));
exports.default = real_estate_router;
//# sourceMappingURL=real_estate.routes.js.map