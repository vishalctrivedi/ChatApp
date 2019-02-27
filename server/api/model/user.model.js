const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;

function userModel() { }
userModel.prototype.login = (body, callback) => {
    console.log("model ", body.Password);
    user.findOne({ "Email": body.Email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else if (result != null) {
            bcrypt.compare(body.Password, bcrypt.hash(result.Password, saltRounds), function (err, res) {
                // res == true
                if (res) {
                    console.log("Login Successful");
                    callback(null, res);
                } else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
            // bcrypt.compare(body.Password, result.Password)
            //     .then((res) => {
            //         if (res) {
            //             console.log("Login Successful");
            //             callback(null, res);
            //         } else {
            //             console.log("Incorrect password");
            //             callback("Incorrect password");
            //         }
            //     });
            // });
        } else {
            console.log("invalid user");
            callback("invalid user");
        }
    });
}
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: [true, "Firstname required"]
    },
    lastname: {
        type: String,
        require: [true, "Lastname required"]
    },
    Email: {
        type: String,
        require: [true, "Email required"]
    },
    Password: {
        type: String,
        require: [true, "Password required"]
    },
}, {
        timestamps: true
    });
var user = mongoose.model('User', UserSchema);

function userModel() { }

// function hash(Password) {
//     var pass = bcrypt.hashSync(Password, saltRounds);
//     return pass;
// }

userModel.prototype.registration = (body, callback) => {

    user.find({
        "Email": body.email
    }, (err, data) => {
        if (err) {
            console.log("Error in registration");
            callback(err);
        } else {
            if (data.length > 0) {
                console.log("Email already exists");
                callback("User already present");
            } else {

                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(body.Password, salt, function (err, hash) {
                        // Store hash in your password DB.
                        var newUser = new user({
                            "firstname": body.firstname,
                            "lastname": body.lastname,
                            "Email": body.Email,
                            "Password": hash
                        })
                        newUser.save((err, result) => {
                            if (err) {
                                console.log("Model not found");
                                callback(err);
                            } else {
                                console.log("Registered Successfully");
                                callback(null, result);
                            }
                        })
                    });
                });
            }
        }
    });
}
module.exports = new userModel();
