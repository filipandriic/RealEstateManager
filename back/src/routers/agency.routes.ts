import express from 'express';
import { AgencyController } from '../controllers/agency.controller';
const agency_router = express.Router();

agency_router.route('/addAgency').post(
    (req, res)=>new AgencyController().add_agency(req, res)
)

agency_router.route('/getAgencies').get(
    (req, res)=>new AgencyController().get_all(req, res)
)

agency_router.route('/getAgency').post(
    (req, res)=>new AgencyController().get_one(req, res)
)

export default agency_router;