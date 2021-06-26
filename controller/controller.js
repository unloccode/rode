const db = require('../config/db.config.js');
const User = db.User;

exports.createUser = (req, res) => {
    let user = {},
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