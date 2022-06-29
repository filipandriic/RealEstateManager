import * as express from 'express';
import Characteristic from '../models/characteristic';

export class CharacteristicController {
    get_all_characteristics = (req: express.Request, res: express.Response) => {
        Characteristic.find({}, (err, characteristics) => {
            if (err) console.log(err);
            else res.json(characteristics);
        })
    }
}