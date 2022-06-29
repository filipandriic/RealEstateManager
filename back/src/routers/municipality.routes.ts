import express from 'express';
import { MunicipalityController } from '../controllers/municipality.controller';

const municipality_router = express.Router();

municipality_router.route('/getMunicipalities').get(
    (req, res)=>new MunicipalityController().get_all(req, res)
)

municipality_router.route('/pushMicrolocation').post(
    (req, res)=>new MunicipalityController().push_microlocation(req, res)
)

municipality_router.route('/pullMicrolocation').post(
    (req, res)=>new MunicipalityController().pull_microlocation(req, res)
)

municipality_router.route('/getMunicipality').post(
    (req, res)=>new MunicipalityController().get_municipality(req, res)
)

export default municipality_router;