import express from 'express';
import { FavouritesController } from '../controllers/favourites.controller';

const favourites_router = express.Router();

favourites_router.route('/addFavourite').post(
    (req, res)=>new FavouritesController().add_favourite(req, res)
)

favourites_router.route('/getMyFavourites').post(
    (req, res)=>new FavouritesController().get_my_favourites(req, res)
)

favourites_router.route('/isFavourite').post(
    (req, res)=>new FavouritesController().is_favourite(req, res)
)

favourites_router.route('/removeFavourite').post(
    (req, res)=>new FavouritesController().remove_favourite(req, res)
)

export default favourites_router;