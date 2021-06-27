const db = require('../config/db.config.js');
const User = db.User;

exports.createUser = (req, res) => {
    let user = {};
    try{
        //build user object
        user.username = req.body.username;
        user.email = req.body.email;
        user.town = req.body.town;
        user.age = req.body.age;
        user.password = req.body.password;
        //save to db
        User.create(user, {
            attributes: [
                'id',
                'username',
                'email',
                'town',
                'age',
                'password'
            ]
        }).then(result=>{
            res.status(200).json(result);
        });
    }catch(error){
        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    }
}

exports.getUser = (req, res) => {
    User.findByPk(req.params.id, {
        attributes: [
            'id',
            'username',
            'email',
            'town',
            'age',
            'password'
        ]
    }).then(user=>{
        res.status(200).json(user);
    }).catch(error=>{
        console.log(error);
        res.status(500).json({
            message: "Error",
            error: error
        });
    })
}

exports.Users = (req, res) => {
    try{
        User.findAll({
            attributes: [
                'id',
                'username',
                'email',
                'town',
                'age',
                'password'
            ]
        }).then(users=>{
            res.status(200).json(users);
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error",
            error: error
        });
    }
}

exports.deleteUser = async(req, res)=>{
    try{
        //delete a user using Pk
        let userId = req.params.id;
        let user = await User.findByPk(userId);
        //check
        if(!user){
            res.status(400).json({
                message: "Does not exist a USER with id=" + userId,
                error: "404"
            });
        }else{
            await user.destroy();
            res.status(200);
        }
    }catch(error){
        res.status(500).json({
            message: "Error -> Cannot delete a USER with id=" + req.params.id,
            error: error.message
        });
    }
}

exports.updateUser = async(req, res) => {
    try{
        //update user
        let user = await User.findByPk(req.params.id);
        if(!user){
            res.status(400).json({
                message: "Not found for updating, a USER with id=" + user,
                error: "404"
            });
        }else{
            //make changes to db
            let updatedObject = {
                username: req.body.username,
                email: req.body.email,
                town: req.body.town,
                age: req.body.age,
                password: req.body.password
            }
            let result = await User.update(updatedObject, {
                returning: true,
                where: {id: req.body.id},
                attributes: [
                    'id',
                    'username',
                    'email',
                    'town',
                    'age',
                    'password'
                ]
            });
            //return a response to the client
            if(!result){
                res.status(500).json({
                    message: "Error -> Cannot make updates for USER with id=" + req.params.id,
                    error: "Failed to Update"
                });
            }
            res.status(200).json(result);
        }
    }catch(error){
        res.status(500).json({
            message: "Error ->Canno make updates for the USER with id=" + req.params.id,
            error: error.message
        });
    }
}