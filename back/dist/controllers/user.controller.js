"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default(req.body);
            user_1.default.findOne({ $or: [{ 'username': req.body.username }, { 'email': req.body.email }] }, (err, exists) => {
                if (err)
                    console.log(err);
                else {
                    if (exists == null)
                        user.save().then(user => {
                            res.status(200).json({ 'message': 'User added.' });
                        }).catch(err => {
                            res.status(400).json({ 'message': 'Unknown error.' });
                        });
                    else
                        res.json({ 'message': 'Username or email already taken.' });
                }
            });
        };
        this.get_all_pending = (req, res) => {
            user_1.default.find({ 'status': 'pending' }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.get_all = (req, res) => {
            user_1.default.find({ 'status': 'accepted' }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.accept_user = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'status': 'accepted' } }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'User accepted' });
            });
        };
        this.reject_user = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.deleteOne({ 'username': username }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'User rejected' });
            });
        };
        this.change_password = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'Password changed' });
            });
        };
        this.update_user_info = (req, res) => {
            let username = req.body.username;
            let phone = req.body.phone;
            let email = req.body.email;
            let agency = req.body.agency;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'phone': phone, 'email': email, 'agency': agency } }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'User info updated' });
            });
        };
        this.edit_user = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.updateOne({ 'username': username }, { $set: req.body }, (err, ret) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'User updated' });
            });
        };
        this.get_by_username = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map