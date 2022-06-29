import express from 'express';
import { RealEstateController } from '../controllers/real_estate.controller';

const real_estate_router = express.Router();

real_estate_router.route('/addRealEstate').post(
    (req, res)=>new RealEstateController().add(req, res)
)

real_estate_router.route('/getAll').get(
    (req, res)=>new RealEstateController().get_all(req, res)
)

real_estate_router.route('/getByAdvertiser').post(
    (req, res)=>new RealEstateController().get_by_username(req, res)
)

real_estate_router.route('/updateRealEstate').post(
    (req, res)=>new RealEstateController().update(req, res)
)

real_estate_router.route('/sellRealEstate').post(
    (req, res)=>new RealEstateController().sell(req, res)
)

real_estate_router.route('/getNumRealEstatesAdvertiser').post(
    (req, res)=>new RealEstateController().get_sold_from_advertiser_by_month(req, res)
)

real_estate_router.route('/getNumRealEstatesAgency').post(
    (req, res)=>new RealEstateController().get_sold_from_agency_by_month(req, res)
)

real_estate_router.route('/searchRealEstates').post(
    (req, res)=>new RealEstateController().search(req, res)
)

real_estate_router.route('/getNumRealEstatesMicrolocation').post(
    (req, res)=>new RealEstateController().get_num_from_microlocation(req, res)
)

export default real_estate_router;