const mongoose = require("mongoose");
const valid = require("validator");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        validator: (v)=>{
            return valid.isEmail(v);
        },
        message: `{VALUE} is not a valid email`
    },
    password: {
        type: String
    }

});

const User = mongoose.model("User", UserSchema);

module.exports = User;

