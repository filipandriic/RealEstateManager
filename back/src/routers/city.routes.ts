import express from 'express';
import { CityController } from '../controllers/city.controller';

const city_router = express.Router();

city_router.route('/getCities').get(
    (req, res)=>new CityController().get_all_cities(req, res)
)

city_router.route('/getCity').post(
    (req, res)=>new CityController().get_city(req, res)
)


export default city_router;