import * as express from 'express';
import City from '../models/city';

export class CityController {
    get_all_cities = (req: express.Request, res: express.Response) => {
        City.find({}, (err, c) => {
            if (err) console.log(err);
            else res.json(c);
        })
    }

    get_city = (req: express.Request, res: express.Response) => {
        City.findOne({'name': req.body.name}, (err, c) => {
            if (err) console.log(err);
            else res.json(c);
        })
    }
}