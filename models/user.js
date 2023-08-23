const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },

    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: [true, 'Email already exists']
    },
    password: String,
},{
    timestamps: true,
    versionKey: false // You should be aware of the outcome after set to false
});
module.exports = mongoose.model('User', UserSchema);