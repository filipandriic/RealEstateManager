"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favourites_controller_1 = require("../controllers/favourites.controller");
const favourites_router = express_1.default.Router();
favourites_router.route('/addFavourite').post((req, res) => new favourites_controller_1.FavouritesController().add_favourite(req, res));
favourites_router.route('/getMyFavourites').post((req, res) => new favourites_controller_1.FavouritesController().get_my_favourites(req, res));
favourites_router.route('/isFavourite').post((req, res) => new favourites_controller_1.FavouritesController().is_favourite(req, res));
favourites_router.route('/removeFavourite').post((req, res) => new favourites_controller_1.FavouritesController().remove_favourite(req, res));
exports.default = favourites_router;
//# sourceMappingURL=favourites.routes.js.map