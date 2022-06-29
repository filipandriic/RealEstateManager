import * as express from 'express';
import Municipality from '../models/municipality';

export class MunicipalityController {
    get_all = (req: express.Request, res: express.Response) => {
        Municipality.find({}, (err, c) => {
            if (err) console.log(err);
            else res.json(c);
        })
    }

    push_microlocation = (req: express.Request, res: express.Response) => {
        Municipality.collection.updateOne({'name': req.body.name}, {$push: {'microlocations': req.body.microlocation}}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Municipality updated'});
        })
    }

    pull_microlocation = (req: express.Request, res: express.Response) => {
        Municipality.collection.updateMany({}, {$pull: {'microlocations': req.body.microlocation}}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Municipality updated'});
        })
    }

    get_municipality = (req: express.Request, res: express.Response) => {
        Municipality.findOne({'name': req.body.name}, (err, c) => {
            if (err) console.log(err);
            else res.json(c);
        })
    }
}