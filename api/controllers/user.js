const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt =require("jsonwebtoken");

const registerController = (req,res,next)=>{
    bcrypt.hash(req.body.password, 10, (err,hash)=>{
        if(err){
            res.status(500).json({
                error: err
            })    
        }

        let user = new  User({
            email: req.body.email,
            password: hash
        })

        user.save()
            .then(result=>{
                res.status(201).json({
                    message: "Successfully Added",
                    user: result
                })
            })
            .catch(err=>{
                res.json(err)
            })


    })
}

const getAllUser = (req,res,next)=>{
    User.find()
        .then(users=>{
            res.json({users})
        })
        .catch(err=>{
            res.json(err)
        })
}

const loginController = (req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({email})
        .then(user=>{
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(err){
                        res.json({
                            message: "Error Occured"
                        })
                    }
                    if(result){
                        let token = jwt.sign({email: user.email,_id: user._id}, 'SECRET',
                        {expiresIn: '2h'})
                        res.json({
                            message: "Login succesful",
                            token
                        })    
                    } else{
                            res.json({
                                mesaage: "login failed",
                            }) 
                       
                    }
                });
            }
            else{
                res.json({
                    mesaage: "user not found"
                })

            }
        })
        .catch()
}

module.exports = {
    registerController,
    getAllUser,
    loginController
}