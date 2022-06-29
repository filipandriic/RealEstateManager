import express from 'express';
import { MicrolocationController } from '../controllers/microlocation.controller';

const microlocation_router = express.Router();

microlocation_router.route('/getMicrolocations').get(
    (req, res)=>new MicrolocationController().get_all(req, res)
)

microlocation_router.route('/addMicrolocation').post(
    (req, res)=>new MicrolocationController().add(req, res)
)

microlocation_router.route('/pushStreet').post(
    (req, res)=>new MicrolocationController().push_street(req, res)
)

microlocation_router.route('/removeMicrolocation').post(
    (req, res)=>new MicrolocationController().remove(req, res)
)

microlocation_router.route('/getMicrolocation').post(
    (req, res)=>new MicrolocationController().get_microlocation(req, res)
)

export default microlocation_router;