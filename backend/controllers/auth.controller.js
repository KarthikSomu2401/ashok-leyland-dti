let jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const envs = require("../configurations");
const Authentication = require("../models/auth.model");

exports.create_user = function(req, res, next) {
    let authentication = new Authentication({ username: req.body.username, password: req.body.password });
    authentication
        .save()
        .then((response) => {
            res.status(201).send("User Created successfully");
        })
        .catch((error) => {
            return next(error);
        });
};

exports.login_user = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        Authentication.findOne({
                username: req.body.username,
            })
            .then(function(user) {
                if (!user) {
                    res.status(404).send("User details not found");
                } else {
                    bcrypt.compare(req.body.password, user.password, function(
                        err,
                        result
                    ) {
                        if (result == true) {
                            req.user = {
                                username: user.username,
                                password: user.password,
                            };
                            let token = jwt.sign(req.user, envs.SECRET, {
                                expiresIn: "2h", // expires in 2 hours
                            });
                            res.status(200).json({
                                success: true,
                                message: "Authentication successful!",
                                token: token,
                            });
                        } else {
                            res.status(401).send("Password mismatch");
                        }
                    });
                }
            });
    }
};

exports.logout_user = function(req, res, next) {
    delete req.user;
    res.status(200);
};