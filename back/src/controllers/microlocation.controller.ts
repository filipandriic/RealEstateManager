import * as express from 'express';
import Microlocation from '../models/microlocation';

export class MicrolocationController {
    get_all = (req: express.Request, res: express.Response) => {
        Microlocation.find({}, (err, c) => {
            if (err) console.log(err);
            else res.json(c);
        })
    }

    add = (req: express.Request, res: express.Response) => {
        let micro = new Microlocation(req.body);

        Microlocation.findOne({'name': req.body.name}, (err, exists) => {
            if(err) console.log(err);
            else {
                if(exists == null) 
                    micro.save().then(micro=>{
                        res.status(200).json({'message': 'Microlocation added.'});
                    }).catch(err=>{
                        res.status(400).json({'message': 'Unknown error.'})
                    })
                else res.json({'message': 'Microlocation already exists.'})
            }
        })
    }

    push_street = (req: express.Request, res: express.Response) => {
        Microlocation.collection.updateOne({'name': req.body.name}, {$push: {'streets': req.body.street}}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Microlocation updated'});
        })
    }

    remove = (req: express.Request, res: express.Response) => {
        Microlocation.collection.deleteOne({'name': req.body.name}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Microlocation removed'});
        })
    }

    get_microlocation = (req: express.Request, res: express.Response) => {
        Microlocation.findOne({'name': req.body.name}, (err, c) => {
            if (err) console.log(err);
            else res.json(c);
        })
    }

}