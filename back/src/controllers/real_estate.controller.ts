import * as express from 'express';
import Real_estate from '../models/real_estate';
import { ObjectId } from 'mongodb';

export class RealEstateController {
    add = (req: express.Request, res: express.Response) => {
        let real_estate = new Real_estate(req.body);
        real_estate.save().then(real_estate=>{
            res.status(200).json({'message': 'Real estate added.'});
        }).catch(err=>{
            res.status(400).json({'message': 'Unknown error.'})
        })
    }

    get_all = (req: express.Request, res: express.Response) => {
        Real_estate.find({}, (err, real_estates) => {
            if (err) console.log(err);
            else res.json(real_estates);
        })
    }

    get_by_username = (req: express.Request, res: express.Response) => {
        let advertiser = req.body.username;
        Real_estate.find({'advertiser': advertiser}, (err, real_estates) => {
            if (err) console.log(err);
            else res.json(real_estates);
        })
    }

    update = (req: express.Request, res: express.Response) => {
        let id = new ObjectId(req.body._id);
        req.body._id = id;
        Real_estate.collection.updateOne({'_id': id}, {$set: req.body}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Real estate updated'});
        })
    }

    sell = (req: express.Request, res: express.Response) => {
        let id = new ObjectId(req.body._id);
        req.body._id = id;
        Real_estate.collection.updateOne({'_id': id}, {$set: req.body}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Real estate sold'});
        })
    }

    get_sold_from_advertiser_by_month = (req: express.Request, res: express.Response) => {
        let month = req.body.month;
        let microlocation = req.body.microlocation;

        Real_estate.count({'sold': month, 'microlocation': microlocation}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'number': ret});
        })
    }

    get_sold_from_agency_by_month = (req: express.Request, res: express.Response) => {
        let month = req.body.month;
        let agency = req.body.agency;
        let microlocation = req.body.microlocation;

        Real_estate.count({'agency': agency, 'sold': month, 'microlocation': microlocation}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'number': ret});
        })
    }

    search = (req: express.Request, res: express.Response) => {
        Real_estate.find(req.body, (err, real_estates) => {
            if (err) console.log(err);
            else res.json(real_estates);
        })
    }

    get_num_from_microlocation = (req: express.Request, res: express.Response) => {
        Real_estate.count({'microlocation': req.body.microlocation}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'number': ret});
        })
    }
}