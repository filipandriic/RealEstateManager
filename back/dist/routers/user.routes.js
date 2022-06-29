"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_router = express_1.default.Router();
user_router.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
user_router.route('/getByUsername').post((req, res) => new user_controller_1.UserController().get_by_username(req, res));
user_router.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
user_router.route('/getPendingUsers').get((req, res) => new user_controller_1.UserController().get_all_pending(req, res));
user_router.route('/getUsers').get((req, res) => new user_controller_1.UserController().get_all(req, res));
user_router.route('/acceptUser').post((req, res) => new user_controller_1.UserController().accept_user(req, res));
user_router.route('/rejectUser').post((req, res) => new user_controller_1.UserController().reject_user(req, res));
user_router.route('/changePassword').post((req, res) => new user_controller_1.UserController().change_password(req, res));
user_router.route('/updateUserInfo').post((req, res) => new user_controller_1.UserController().update_user_info(req, res));
user_router.route('/editUser').post((req, res) => new user_controller_1.UserController().edit_user(req, res));
exports.default = user_router;
//# sourceMappingURL=user.routes.js.map