import * as express from 'express';
import Agency from '../models/agency';

export class AgencyController {

    add_agency = (req: express.Request, res: express.Response) => {
        let agency = new Agency(req.body);

        Agency.findOne({'PIB': req.body.PIB}, (err, exists) => {
            if (err) console.log(err);
            else {
                if (exists == null)
                    agency.save().then(agency=>{
                        res.status(200).json({'message': 'Agency added.'});
                    }).catch(err=>{
                        res.status(400).json({'message': 'Unknown error.'})
                    })
                else res.json({'message': 'PIB already taken.'})
            }
        })
    }

    get_all = (req: express.Request, res: express.Response) => {
        Agency.find({}, (err, agencies) => {
            if (err) console.log(err);
            else res.json(agencies);
        })
    }

    get_one = (req: express.Request, res: express.Response) => {
        Agency.findOne({'name': req.body.name}, (err, agency) => {
            if (err) console.log(err);
            else res.json(agency);
        })
    }
}