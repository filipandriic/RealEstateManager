import express from 'express';
import { CharacteristicController } from '../controllers/characteristic.controller';

const characteristics_router = express.Router();

characteristics_router.route('/getAllCharacteristics').get(
    (req, res)=>new CharacteristicController().get_all_characteristics(req, res)
)

export default characteristics_router;