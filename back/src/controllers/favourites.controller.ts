import * as express from 'express';
import Favourite from '../models/Favourite';

export class FavouritesController {
    add_favourite = (req: express.Request, res: express.Response) => {
        let fav = new Favourite(req.body);

        fav.save().then(fav=>{
            res.status(200).json({'message': 'Favourite added.'});
        }).catch(err=>{
            res.status(400).json({'message': 'Unknown error.'})
        })
    }

    get_my_favourites = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Favourite.find({'username': username}, (err, favourites) => {
            if (err) console.log(err);
            else res.json(favourites);
        })
    }

    is_favourite = (req: express.Request, res: express.Response) => {
        Favourite.findOne(req.body, (err, exists) => {
            if (err) console.log(err);
            else res.json(exists);
        })
    }

    remove_favourite = (req: express.Request, res: express.Response) => {
        Favourite.collection.deleteOne(req.body, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Favourite removed'});
        })
    }
}