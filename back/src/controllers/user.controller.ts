import * as express from 'express';
import User from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    register = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);

        User.findOne({$or: [{'username': req.body.username}, {'email': req.body.email}]}, (err, exists)=>{
            if(err) console.log(err);
            else {
                if(exists == null) 
                    user.save().then(user=>{
                        res.status(200).json({'message': 'User added.'});
                    }).catch(err=>{
                        res.status(400).json({'message': 'Unknown error.'})
                    })
                else res.json({'message': 'Username or email already taken.'})
            }
            
        })
    }

    get_all_pending = (req: express.Request, res: express.Response) => {
        User.find({'status': 'pending'}, (err, users) => {
            if (err) console.log(err);
            else res.json(users);
        })
    }

    get_all = (req: express.Request, res: express.Response) => {
        User.find({'status': 'accepted'}, (err, users) => {
            if (err) console.log(err);
            else res.json(users);
        })
    }

    accept_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.collection.updateOne({'username': username}, {$set: {'status': 'accepted'}}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'User accepted'});
        })
    }

    reject_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.collection.deleteOne({'username': username}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'User rejected'});
        })
    }

    change_password = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        User.collection.updateOne({'username': username}, {$set: {'password': password}}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'Password changed'});
        })
    }

    update_user_info = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        let phone = req.body.phone;
        let email = req.body.email;
        let agency = req.body.agency;
        User.collection.updateOne({'username': username}, {$set: {'phone': phone, 'email': email, 'agency': agency}}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'User info updated'});
        })
    }

    edit_user = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.updateOne({'username': username}, {$set: req.body}, (err, ret) => {
            if (err) console.log(err);
            else res.json({'message': 'User updated'});
        })
    }

    get_by_username = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
}