import express from 'express';
import { UserController } from '../controllers/user.controller';
const user_router = express.Router();

user_router.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

user_router.route('/getByUsername').post(
    (req, res)=>new UserController().get_by_username(req, res)
)

user_router.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

user_router.route('/getPendingUsers').get(
    (req, res)=>new UserController().get_all_pending(req, res)
)

user_router.route('/getUsers').get(
    (req, res)=>new UserController().get_all(req, res)
)

user_router.route('/acceptUser').post(
    (req, res)=>new UserController().accept_user(req, res)
)

user_router.route('/rejectUser').post(
    (req, res)=>new UserController().reject_user(req, res)
)

user_router.route('/changePassword').post(
    (req, res)=>new UserController().change_password(req, res)
)

user_router.route('/updateUserInfo').post(
    (req, res)=>new UserController().update_user_info(req, res)
)

user_router.route('/editUser').post(
    (req, res)=>new UserController().edit_user(req, res)
)

export default user_router;