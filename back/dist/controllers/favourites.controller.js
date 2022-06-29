"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouritesController = void 0;
const Favourite_1 = __importDefault(require("../models/Favourite"));
class FavouritesController {
    constructor() {
        this.add_favourite = (req, res) => {
            let fav = new Favourite_1.default(req.body);
            fav.save().then(fav => {
                res.status(200).json({ 'message': 'Favourite added.' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Unknown error.' });
            });
        };
        this.get_my_favourites = (req, res) => {
            let username = req.body.username;
            Favourite_1.default.find({ 'username': username }, (err, favourites) => {
                if (err)
                    console.log(err);
                else
                    res.json(favourites);
            });
        };
        this.is_favourite = (req, res) => {
            Favourite_1.default.findOne(req.body, (err, exists) => {
                if (err)
                    console.log(err);
                else
                    res.json(exists);
            });
        };
        this.remove_favourite = (req, res) => {
            Favourite_1.default.collection.deleteOne(req.body, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Favourite removed' });
            });
        };
    }
}
exports.FavouritesController = FavouritesController;
//# sourceMappingURL=favourites.controller.js.map